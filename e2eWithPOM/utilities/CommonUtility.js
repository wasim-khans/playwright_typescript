class CommonUtility {
    constructor(page) {
        this.page = page
    }
    async cleanCookies() {
        await this.page.evaluate(() => {
            window.localStorage.clear();
            window.sessionStorage.clear();
            console.log('Cookies Cleaned')
        });
    }
    
    async cleanCacheAndCookies() {
        await this.cleanCookies();
    }
}

module.exports = { CommonUtility }