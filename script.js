const step1=document.querySelector(".step1"),
step2=document.querySelector(".step2"),
step3=document.querySelector(".step3"),
emailAddress=document.querySelector("#emailAddress"),
verifyEmail=document.querySelector("#verifyEmail"),
inputs=document.querySelectorAll(".otp-group input"),
nextButton=document.querySelector(".nextButton"),
verifyButton=document.querySelector(".verifyButton")
let OTP = "";

// console.log(inputs);

window.addEventListener("load", ()=>{
emailjs.init("-Hlbmzz5k63SPlwkK")

    step2.style.display="none";
    step3.style.display="none";
    nextButton.classList.add("disable");
    verifyButton.classList.add("disable"); 
})

const validateEmail = (email)=>{
    let re=/\S+@\S+\.\S+/;
    if(re.test(email)){
        nextButton.classList.remove("disable");
    }else{
        nextButton.classList.add("disable")
    }
}

const generateOTP=() =>{
    return Math.floor(1000+Math.random()* 9000);
    //oString(); // Generates a 6-digit OTP
};

inputs.forEach((input)=>{
    input.addEventListener("keyup",function(e){
        if (this.value.length>=1) {
            e.target.value=e.target.value.substr(0,1);
        }
        if (inputs[0].value != "" &&
            inputs[1].value != "" &&
            inputs[2].value != "" &&
            inputs[3].value != "" 
        ) {
            verifyButton.classList.remove("disable")
        }else{
        verifyButton.classList.add("disable")
        }
    })
})



const serviceID = "service_u4vji6";
// const serviceID = "service_u4vji6i";
const templateID = "template_pfpzx8m";
nextButton.addEventListener("click", ()=>{
    OTP=generateOTP();
nextButton.innerHTML="&#9889; Sending..."
    let templateParam={
        to_name: "",
        OTP:OTP,
        message:"",
        reply_to: emailAddress.value,
    };

    emailjs.send(serviceID, templateID, templateParam).then((res)=>{
            console.log(res)
            nextButton.innerHTML="Next &rarr;"
            step1.style.display="none";
            step2.style.display="block";
            step3.style.display="none";
    },(err)=>{
        console.log(err)
    });
});

verifyButton.addEventListener("click" , ()=>{
    let values="";
    inputs.forEach((input)=>{
        values += input.value;
    });

    if (OTP==values) {
            step1.style.display="none";
            step2.style.display="none";
            step3.style.display="block";
    }else{
        verifyButton.classList.add("error-shak");

        setTimeout(()=>{
            verifyButton.classList.remove("error-shak");
        },1000)
    }
})

