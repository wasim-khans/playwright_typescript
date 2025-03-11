const { test, expect } = require('@playwright/test');
test.only('@Web Client App login and extract all product titles', async ({ page }) => {
   //js file- Login js, DashboardPage
   const email = "muhammadwasimkhan8@gmail.com";
   const productName = 'IPHONE 13 PRO';
   const products = page.locator(".card-body");
   await page.goto("https://rahulshettyacademy.com/client");
   await page.locator("#userEmail").fill(email);
   await page.locator("#userPassword").type("Nopass@1234");
   await page.locator("[value='Login']").click();
   await page.waitForLoadState('networkidle');
   await page.locator(".card-body b").first().waitFor();
   const titles = await page.locator(".card-body b").allTextContents();
   console.log('Available products in shop', titles);
   const productCount = await products.count();
   for (let i = 0; i < productCount; i++) {
      if (await products.nth(i).locator("b").textContent() === productName) {
         console.log('product found at index: ', i);
         await products.nth(i).locator("text= Add To Cart").click();
         await console.log('product added to cart');
         break;
      }
      else if (i === productCount - 1) {
         console.log('product not found on product list');
      }
   }


   // Go to Cart and verify product is added

   await page.waitForLoadState('networkidle');
   await page.locator('[routerlink="/dashboard/cart"]').click();
   await page.waitForLoadState('networkidle');
   const cart = page.locator("div.cart li");
   await cart.locator('h3').first().waitFor();
   const cartTitles = await cart.locator("h3").allTextContents();
   console.log('Items in cart', cartTitles);
   console.log('now starting verfication of bought item to be in cart')
   const cartItems = await page.locator("div.cart li");
   const count = await cartItems.count(); 

   let orderNumber = '';
   for (let i = 0; i < count; i++) {
      console.log('Checking cart item at index:', i);
      if (await cartItems.nth(i).locator("h3").textContent() === productName) {
         orderNumber = await cartItems.nth(i).locator('[class="itemNumber"]').textContent();
         console.log('product found in cart at index', i, 'with order number as', orderNumber) //this shows incorrect order number

         await page.pause()
         break;

      }
   }
   // checkout flow
   const checkoutButton = page.locator('button', { hasText: 'Checkout' });
   await checkoutButton.click();
   await page.waitForLoadState('networkidle');
   const cvvField = await page.locator('input[type="text"]').nth(1)
   await cvvField.fill('123');

   const nameField = await page.locator('input[type="text"]').nth(2)
   await nameField.fill('Wasim');

   await page.locator('input[name="coupon"]').fill('boss');
   await page.getByRole('button', { name: 'Apply Coupon' }).click();
   await page.getByText('* Invalid Coupon').dblclick();
   await expect(page.locator('form')).toContainText('* Invalid Coupon');
   await page.getByRole('combobox').nth(1).selectOption('30');
   await page.getByPlaceholder('Select Country').click();
   await page.getByPlaceholder('Select Country').type('pak');
   await page.waitForTimeout(2000);
   await page.locator('span[class="ng-star-inserted"] i').click();
   await page.getByText('Place Order ').click();
   // Confirm Thank you page
   await page.locator('h1').waitFor();
   console.log(await page.locator('h1').textContent());

   // Get order number
   orderNumber = await page.locator("td.box:nth-of-type(1) label").nth(1).textContent();
   orderNumber = orderNumber.replace(/\|/g, '').trim();
   console.log(`Correct order number: (${orderNumber})`);

   // Go to history page and confirm if order UUID is present
   await page.locator('[routerlink="/dashboard/myorders"]').nth(0).click();
   await page.pause();
   await page.locator("tbody th").first().waitFor();
   const allOrders = await page.locator("tbody th")
   const numberOfAllOrders = await allOrders.count();
   console.log('Total orders in order list', numberOfAllOrders);
   const allorderNumbers= await allOrders.allTextContents();
   console.log('All ordersNumbers =', allorderNumbers);   
   console.log('Order number to be verified:', orderNumber);
   console.log('First order number in order history:', allorderNumbers[0]);
   console.log("Order number to be verified is present in order list:", allorderNumbers.includes(orderNumber));
  
   await page.pause();


});
