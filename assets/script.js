async function getLaptops() {
    // Get user selections
    const processor = document.querySelectorAll('input[name="processor"]:checked');
    const ram = document.querySelector('input[name="ram"]:checked');
    const storage = document.querySelector('input[name="storage"]:checked');
    const screenSize = document.querySelector('input[name="screen-size"]:checked');
    const graphicsCard = document.querySelectorAll('input[name="graphics-card"]:checked');
  
    // Build query parameters for API request
    const params = new URLSearchParams();
    if (processor.length > 0) {
      params.append("processor", Array.from(processor).map(p => p.value).join(","));
    }
    if (ram) {
      params.append("ram", ram.value);
    }
    if (storage) {
      params.append("storage", storage.value);
    }
    if (screenSize) {
      params.append("screen_size", screenSize.value);
    }
    if (graphicsCard.length > 0) {
      params.append("graphics_card", Array.from(graphicsCard).map(g => g.value).join(","));
    }
  
    try {
      // Make API request with query parameters
      const response = await fetch(`https://?${params}`);
      const laptops = await response.json();
  
      // Display laptops
      const laptopsContainer = document.getElementById("laptops-container");
      laptopsContainer.innerHTML = "";
      laptops.forEach(laptop => {
        const laptopElement = document.createElement("div");
        laptopElement.innerHTML = `
          <h3>${laptop.name}</h3>
          <ul>
            <li>Processor: ${laptop.processor}</li>
            <li>RAM: ${laptop.ram}</li>
            <li>Storage: ${laptop.storage}</li>
            <li>Screen Size: ${laptop.screen_size}</li>
            <li>Graphics Card: ${laptop.graphics_card}</li>
            <li>Price: $${laptop.price}</li>
          </ul>
        `;
        laptopsContainer.appendChild(laptopElement);
      });
    } catch (error) {
      console.error(error);
    }
  }