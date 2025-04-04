
class LoginPage{
    constructor(page){
        this.page=page;
        this.url='https://rahulshettyacademy.com/client';
        this.email= 'muhammadwasimkhan8@gmail.com';
        this.password= 'Nopass@1234';
        
    }
async navigate(){
  await this.page.goto(this.url);
}
async fillCredentialsAndLogin(){
    await this.page.getByPlaceholder("email@example.com").fill(this.email);
    await this.page.getByPlaceholder("enter your passsword").fill(this.password);
    await this.page.getByRole('button',{name:"Login"}).click();
    await this.page.waitForLoadState('networkidle');
}



}
module.exports={LoginPage};