function updateAssetData(asset) {
  if (!asset?.properties) {
    console.warn('Invalid asset data received');
    return;
  }

  document.querySelectorAll('[data-field]').forEach(element => {
    const fieldPath = element.getAttribute('data-field');
    // Parse path considering both dot notation and array indices
    const value = fieldPath.split(/[.\[\]]/)
      .filter(Boolean)
      .reduce((obj, key) => obj?.[key], asset);

    element.textContent = value || 'N/A';
  });
}

window.addEventListener('message', function(event) {
  if (event.data.type === 'asset-data') {
    updateAssetData(event.data.payload);
  }
});
