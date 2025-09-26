/**
 * script.js
 * สำหรับเพิ่มฟังก์ชันการโต้ตอบในหน้า index.html ของร้านคว้นดำ
 */

// 1. ฟังก์ชันสำหรับการเปิด/ปิดเมนูนำทางบนอุปกรณ์มือถือ (Hamburger Menu)
// *******************************************************************
function setupMobileMenu() {
    // สมมติว่าใน HTML มีปุ่ม <button class="menu-toggle"> และเมนู <nav class="main-nav">
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    // ตรวจสอบว่าองค์ประกอบที่เราต้องการมีอยู่จริงในหน้า HTML
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            // สลับ (Toggle) คลาส 'active' เพื่อให้ CSS จัดการการแสดง/ซ่อนเมนู
            mainNav.classList.toggle('active');
            menuToggle.classList.toggle('active');
            
            // ใน CSS คุณสามารถเขียน:
            // .main-nav:not(.active) { display: none; }
            // หรือใช้ transform/transition ในการเลื่อนเมนูเข้า/ออก
            
            console.log('Mobile menu toggled.');
        });
    }
}

// 2. ฟังก์ชันอัปเดตจำนวนสินค้าในตะกร้า
// **********************************
function updateCartCount(newCount) {
    const cartIcon = document.querySelector('.cart-icon');
    
    if (cartIcon) {
        // อัปเดตข้อความในวงเล็บของไอคอนตะกร้า (🛒 (X))
        cartIcon.textContent = `🛒 (${newCount})`;
        console.log(`Cart count updated to: ${newCount}`);
    }
}

// 3. ฟังก์ชันเริ่มต้นทั้งหมดเมื่อหน้าเว็บโหลดเสร็จ
// **********************************************
document.addEventListener('DOMContentLoaded', () => {
    console.log('คว้นดำ website loaded and ready.');
    
    // เรียกใช้งานฟังก์ชันที่เตรียมไว้
    setupMobileMenu();
    
    // *** ตัวอย่างการใช้งาน: จำลองการเพิ่มสินค้า 2 ชิ้นในตะกร้าหลังโหลดหน้า ***
    // ในโปรเจกต์จริง คุณจะต้องดึงค่านี้มาจาก Local Storage หรือเซิร์ฟเวอร์
    const initialCartCount = 2; 
    updateCartCount(initialCartCount);
    
    // หากต้องการเพิ่มสินค้าเมื่อคลิกปุ่ม "เพิ่มลงตะกร้า" (ซึ่งไม่มีใน index.html ตัวอย่างนี้)
    // คุณสามารถเขียนฟังก์ชันเพิ่มเติมได้ เช่น:
    /*
    document.querySelectorAll('.add-to-cart-button').forEach(button => {
        button.addEventListener('click', () => {
            // โค้ดสำหรับเพิ่มสินค้าและเรียก updateCartCount(จำนวนใหม่)
        });
    });
    */
});