// Favorites system using localStorage
(function() {
  const STORAGE_KEY = 'cmum_favorites';

  // Get favorites set
  function getFavorites() {
    try {
      return new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'));
    } catch (e) {
      return new Set();
    }
  }

  // Save favorites set
  function saveFavorites(favs) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...favs]));
  }

  // Toggle a recipe slug
  function toggleFavorite(slug) {
    const favs = getFavorites();
    if (favs.has(slug)) {
      favs.delete(slug);
    } else {
      favs.add(slug);
    }
    saveFavorites(favs);
    return favs.has(slug);
  }

  // Check if a slug is favorite
  function isFavorite(slug) {
    return getFavorites().has(slug);
  }

  // Update all favorite indicators on cards
  function syncCardIndicators() {
    const favs = getFavorites();
    document.querySelectorAll('.recipe-card').forEach(function(card) {
      var href = card.getAttribute('href') || '';
      var slug = href.replace(/.*\/recettes\//, '').replace('.html', '');
      var indicator = card.querySelector('.fav-indicator');
      if (indicator) {
        if (favs.has(slug)) {
          indicator.classList.add('is-fav');
          indicator.textContent = '♥';
        } else {
          indicator.classList.remove('is-fav');
          indicator.textContent = '♡';
        }
      }
    });
  }

  // Update the favorite button on a recipe page
  function syncRecipeButton() {
    var btn = document.getElementById('fav-btn');
    if (!btn) return;
    var slug = btn.dataset.slug;
    if (isFavorite(slug)) {
      btn.classList.add('is-fav');
      btn.querySelector('.fav-icon').textContent = '♥';
      btn.querySelector('.fav-text').textContent = 'Retirer des favoris';
    } else {
      btn.classList.remove('is-fav');
      btn.querySelector('.fav-icon').textContent = '♡';
      btn.querySelector('.fav-text').textContent = 'Ajouter aux favoris';
    }
  }

  // Build favorites page content
  function renderFavoritesPage() {
    var container = document.getElementById('favorites-grid');
    if (!container) return;

    var favs = getFavorites();
    var countEl = document.getElementById('favorites-count');

    if (favs.size === 0) {
      container.innerHTML = '<div class="empty-favorites">' +
        '<p class="empty-icon">♡</p>' +
        '<p>Aucune recette en favoris pour le moment.</p>' +
        '<p>Ajoutez des recettes en cliquant sur le coeur sur les fiches recettes.</p>' +
        '<a href="./toutes-les-recettes.html" class="btn-see-all">Parcourir les recettes</a>' +
        '</div>';
      if (countEl) countEl.textContent = '(0)';
      return;
    }

    if (countEl) countEl.textContent = '(' + favs.size + ')';

    // Show only favorite cards, hide others
    var cards = container.querySelectorAll('.recipe-card');
    var shown = 0;
    cards.forEach(function(card) {
      var href = card.getAttribute('href') || '';
      var slug = href.replace(/.*\/recettes\//, '').replace('.html', '');
      if (favs.has(slug)) {
        card.style.display = '';
        shown++;
      } else {
        card.style.display = 'none';
      }
    });

    if (shown === 0) {
      container.insertAdjacentHTML('beforeend',
        '<div class="empty-favorites">' +
        '<p>Aucune recette en favoris.</p>' +
        '</div>');
    }
  }

  // PWA Install prompt
  var deferredPrompt = null;

  window.addEventListener('beforeinstallprompt', function(e) {
    e.preventDefault();
    deferredPrompt = e;
    var installBtn = document.getElementById('pwa-install-btn');
    if (installBtn) {
      installBtn.style.display = '';
      installBtn.addEventListener('click', function() {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(function(result) {
          deferredPrompt = null;
          installBtn.style.display = 'none';
        });
      });
    }
  });

  window.addEventListener('appinstalled', function() {
    var installBtn = document.getElementById('pwa-install-btn');
    if (installBtn) installBtn.style.display = 'none';
    deferredPrompt = null;
  });

  // Init on DOM ready
  document.addEventListener('DOMContentLoaded', function() {
    // Sync card indicators
    syncCardIndicators();

    // Recipe page favorite button
    var favBtn = document.getElementById('fav-btn');
    if (favBtn) {
      syncRecipeButton();
      favBtn.addEventListener('click', function() {
        var slug = favBtn.dataset.slug;
        toggleFavorite(slug);
        syncRecipeButton();
      });
    }

    // Card heart click (prevent navigation)
    document.querySelectorAll('.fav-indicator').forEach(function(indicator) {
      indicator.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        var card = indicator.closest('.recipe-card');
        var href = card ? card.getAttribute('href') : '';
        var slug = href.replace(/.*\/recettes\//, '').replace('.html', '');
        toggleFavorite(slug);
        syncCardIndicators();
        // If on favorites page, also update the grid
        renderFavoritesPage();
      });
    });

    // Favorites page
    renderFavoritesPage();

    // Register service worker
    if ('serviceWorker' in navigator) {
      // Determine root path
      var scripts = document.querySelectorAll('script[src*="favorites.js"]');
      var swPath = './sw.js';
      if (scripts.length > 0) {
        var src = scripts[0].getAttribute('src');
        swPath = src.replace('favorites.js', 'sw.js');
      }
      navigator.serviceWorker.register(swPath).catch(function() {});
    }
  });

  // Expose for external use
  window.cmumFavorites = {
    toggle: toggleFavorite,
    isFavorite: isFavorite,
    getAll: getFavorites
  };
})();
