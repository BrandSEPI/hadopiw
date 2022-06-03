<template>
    <div class="signIn">
        <div class="head">
            <h2>Create your account</h2>
        </div>
            <div class="body">
            <input id="login" placeholder="Login" type="text">
            <input id="mail" placeholder="Email" type="email" required>
            <div  class="password">
                <input id="pass" class="passwordInput" placeholder="Password" :type="this.passwordType">
                <button v-if="this.passwordType=='password'" id="passwordBtn" @click="this.passwordType='text'">show</button>
                <button v-if="this.passwordType=='text'" id="passwordBtn" @click="this.passwordType='password'">hide</button>
                <!-- <label for="passwordBtn"></label> -->
            </div>
            <p>min. 8 caracteres</p>
            <input id="cPassword" placeholder="Confirm your password" :type="this.passwordType">
        </div>
        <div class="foot">
            <p v-if="this.error!=null" class="error">{{this.error}}</p>
            <button class="btn" @click="submit()">Sign Up</button>
            <router-link class="link" to="/connect">Already have an account ?</router-link>
        </div>
    </div>
</template>

<script>

export default {
  name: 'SignInView',
  data(){
      return {
          passwordType:"password",
          error:null
      }
  },
  methods:{
      async submit(){
          let login = document.querySelector("#login").value
          let email = document.querySelector("#mail").value
          let password = document.querySelector("#pass").value
          let cPassword = document.querySelector("#cPassword").value
        // console.log(password);
        //   console.log(username,email,password,cPassword);
          if(password!=cPassword){
              this.error="the passwords doesn't matches"
          } else if(login=="" || email=="") 
          {
            this.error="the username and email are required"
          } else {
              let user = {
                  "username":login,
                  "email":email,
                  "password":password
              }
              let res = await this.$store.dispatch("createUser",user)
              console.log(res);
            //   if(res=="error"){
            //       this.error="invalid form"
            //   } else {
            //       location.href="/connect"
            //   }
          }
      },
  },  
}
</script>



<style scoped>
.signIn{
    color: white;
    width: 45vw;
    border: solid 3px rgba(255, 208, 0, 0.863);
    margin: 100px auto;
    display: flex;
    flex-direction: column;
    border-radius: 15px;
}
.body{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.password{
    justify-content: center;
    display: flex;
    width: 100%;
}

input{
    width: 65%;
    height: 50px;
    margin: 5px;
    border-radius: 12px;
    background-color: rgba(146, 146, 146, 0.63);
    color: rgb(41, 41, 41);
    font-size: 1.5em;
    outline: none;
}
input::placeholder {
  color: rgb(58, 58, 58);
  text-align: center;
}
.btn{
    margin: 20px;
    width: 70%;
    border:none;
    height: 75px;
    background-color: rgba(255, 208, 0, 0.863);
    border-radius: 12px;
    font-size: 2em;
}

#passwordBtn{
    background-color: rgba(146, 146, 146, 0.63);
    border: none;
    height: 30px;
    border-radius:12px;
    margin-right: -35vw;
    position: absolute;
    align-self: center;
    color: white;

}

a{
    color:white;
}

.foot{
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

p{
        margin: -5px auto auto auto;
    }
.error{
    color: rgb(184, 33, 33)
    }

.link{
    color: rgba(255, 208, 0, 0.863);
}

/* animations */
.btn:hover{
    transform: scale(0.95);
    background-color: rgba(255, 187, 0, 0.863);
}
#passwordBtn:hover{
    transform: scale(1.05);
}
#passwordBtn:checked{
    content:'f06e'
}

</style>