<template>
    <div class="signIn">
        <div class="head">
            <h2>Create your account</h2>
        </div>
        <div class="body">
            <input placeholder="Login" type="text">
            <input placeholder="Email" type="text">
            <input placeholder="Password" type="text">
            <input placeholder="Confirm your password" type="text">
        </div>
        <div class="foot">
            <button class="btn" >Sign Up</button>
            <router-link to="/connect">Already have an account ?</router-link>
        </div>
    </div>
</template>

<script>

export default {
  name: 'SignInView',
  
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
.body>input{
    width: 65%;
    height: 50px;
    margin: 5px;
    border-radius: 12px;
    background-color: rgba(146, 146, 146, 0.63);
    color: rgb(41, 41, 41);
    font-size: 1.5em;
    outline: none;
}
.body>input::placeholder {
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

a{
    color:white;
}

.foot{
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
}


/* animations */
.btn:hover{
    transform: scale(0.95);
    background-color: rgba(255, 187, 0, 0.863);
}
</style>