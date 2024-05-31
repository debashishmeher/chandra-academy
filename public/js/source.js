import {
  login,
  logout,
  signup,
  forgot,
  reset,
  buying,
  enroll,
  admission,
  admission1,
  admission1update,
  admission2,
  admission2update,
  admission3,
  admission3update,
  admission4,
  admission4update,
  admission5,
  admission5update,
  createStudent,
  updateStudent,
  createPayment,
  deleteAdmission
} from "./login";

import FormData from 'form-data'

const loginbtn = document.getElementById("login");
const logoutbtn = document.querySelector(".logout-btn");
const signupbtn = document.getElementById("signup");
const forgotbtn = document.getElementById("forgot");
const resetbtn = document.getElementById("resetpassword");
const enrollbtn = document.querySelector(".enroll");
const admissionBtn = document.getElementById("admissionStart");
const admission1Btn = document.getElementById("admission1");
const admission1updateBtn = document.getElementById("admission1update");
const admission2Btn = document.getElementById("admission2");
const admission2updateBtn = document.getElementById("admission2update");
const admission3Btn = document.getElementById("admission3");
const admission3updateBtn = document.getElementById("admission3update");
const admission4Btn = document.getElementById("admission4");
const admission4updateBtn = document.getElementById("admission4update");
const admission5Btn = document.getElementById("admission5");
const admission5updateBtn = document.getElementById("admission5update");
const createStudentBtn = document.getElementById("createStudent");
const updateStudentBtn = document.getElementById("updateStudent");
const deleteAdmissionBtn = document.getElementsByClassName("deleteAdmission");
const createPaymentBtn = document.getElementById("receipt-action");

if (loginbtn) {
  loginbtn.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    login(email, password);
  });
}
if (logoutbtn) {
  logoutbtn.addEventListener("click", (e) => {
    e.preventDefault();
    logout();
  });
}
if (createStudentBtn) {
  createStudentBtn.addEventListener("click", (e) => {
    e.preventDefault();
    createStudent();
  });
}

if (signupbtn) {
  signupbtn.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("signup-name").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const confirmPassword = document.getElementById(
      "signup-confirmPassword"
    ).value;
    signup(name, email, password, confirmPassword);
  });
}
if (forgotbtn) {
  forgotbtn.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("forgot-email").value;
    forgot(email);
  });
}
if (resetbtn) {
  resetbtn.addEventListener("submit", (e) => {
    e.preventDefault();
    const password = document.getElementById("reset-password").value;
    const confirmPassword = document.getElementById(
      "reset-confirmPassword"
    ).value;
    reset(password, confirmPassword);
  });
}

if (enrollbtn) {
  enrollbtn.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.querySelector(".enroll-name").value;
    const email = document.querySelector(".enroll-email").value;
    const phone = document.querySelector(".phone-number").value;

    enroll(name, email, phone);
  });
}
if (admissionBtn) {
  admissionBtn.addEventListener("click", (e) => {
    e.preventDefault();
    admission();
  });
}
if (admission1Btn) {
  admission1Btn.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("admission-name").value;
    const phone = document.getElementById("admission-phoneNo").value;
    const dob = document.getElementById("admission-dob").value;
    const studentclass = document.getElementById("studentclass").value;
    const medium = document.getElementById("admission-medium").value;
    const gender = document.getElementById("admission-gender").value;
    const adhar = document.getElementById("admission-adhar").value;

    admission1(name, phone, studentclass,medium, dob, gender, adhar);
  });
}
if (admission1updateBtn) {
  admission1updateBtn.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("admission-name").value;
    const phone = document.getElementById("admission-phoneNo").value;
    const dob = document.getElementById("admission-dob").value;
    const studentclass = document.getElementById("studentclass").value;
    const medium = document.getElementById("admission-medium").value;
    const gender = document.getElementById("admission-gender").value;
    const adhar = document.getElementById("admission-adhar").value;

    admission1update(name, phone, studentclass,medium, dob, gender, adhar);
  });
}


if (admission2Btn) {
  admission2Btn.addEventListener("submit", (e) => {
    e.preventDefault();
    const nationallity = document.getElementById(
      "admission-nationallity"
    ).value;
    const religion = document.getElementById("admission-religion").value;
    const catagory = document.getElementById("admission-catagory").value;
    const fatherName = document.getElementById("admission-fatherName").value;
    const motherName = document.getElementById("admission-motherName").value;

    admission2(nationallity, religion, catagory, fatherName, motherName);
  });
}

if (admission2updateBtn) {
  admission2updateBtn.addEventListener("submit", (e) => {
    e.preventDefault();
    const nationallity = document.getElementById(
      "admission-nationallity"
    ).value;
    const religion = document.getElementById("admission-religion").value;
    const catagory = document.getElementById("admission-catagory").value;
    const fatherName = document.getElementById("admission-fatherName").value;
    const motherName = document.getElementById("admission-motherName").value;

    admission2update(nationallity, religion, catagory, fatherName, motherName);
  });
}

if (admission3Btn) {
  admission3Btn.addEventListener("submit", (e) => {
    e.preventDefault();
    const policeStation = document.getElementById(
      "admission-policeStation"
    ).value;
    const village = document.getElementById("admission-village").value;
    const postOffice = document.getElementById("admission-postOffice").value;
    const pin = document.getElementById("admission-pin").value;
    const dist = document.getElementById("admission-dist").value;
    const transport = document.getElementById("admission-transport").value;
    const stay = document.getElementById("admission-stay").value;

    admission3(village, postOffice, policeStation, pin, dist, transport, stay);
  });
}

if (admission3updateBtn) {
  admission3updateBtn.addEventListener("submit", (e) => {
    e.preventDefault();
    const policeStation = document.getElementById(
      "admission-policeStation"
    ).value;
    const village = document.getElementById("admission-village").value;
    const postOffice = document.getElementById("admission-postOffice").value;
    const pin = document.getElementById("admission-pin").value;
    const dist = document.getElementById("admission-dist").value;
    const transport = document.getElementById("admission-transport").value;
    const stay = document.getElementById("admission-stay").value;

    admission3update(village, postOffice, policeStation, pin, dist, transport, stay);
  });
}
if(admission4Btn){
  admission4Btn.addEventListener("submit", (e) => {
    e.preventDefault();
    const studentPhoto = document.getElementById("studentPhoto").files[0];
    const adharPhoto = document.getElementById("adharPhoto").files[0];
    const markPhoto = document.getElementById("markPhoto").files[0];

    const formData= new FormData()
    formData.append("studentPhoto",studentPhoto)
    formData.append("adharPhoto",adharPhoto)
    formData.append("markPhoto",markPhoto)
   
    admission4(formData);
  });
}
if(admission4updateBtn){
  admission4updateBtn.addEventListener("submit", (e) => {
    e.preventDefault();
    const studentPhoto = document.getElementById("studentPhoto").files[0];
    const adharPhoto = document.getElementById("adharPhoto").files[0];
    const markPhoto = document.getElementById("markPhoto").files[0];

    const formData= new FormData()
    formData.append("studentPhoto",studentPhoto)
    formData.append("adharPhoto",adharPhoto)
    formData.append("markPhoto",markPhoto)
   
    admission4update(formData);
  });
}

if (admission5Btn) {
  admission5Btn.addEventListener("submit", (e) => {
    e.preventDefault();
    let registrationFees=document.getElementById("registrationFees")
    let lodgingFees=document.getElementById("lodgingFees")
    let foodingFees=document.getElementById("foodingFees")
    let transportationFees=document.getElementById("transportationFees")
    let monthlyDiscount=document.getElementById("monthlyDiscount")
    let otherDiscount=document.getElementById("otherDiscount")
    if(registrationFees.checked){
      const fees=document.querySelector(`input[name="registration"]:checked`).value
      console.log(fees);
      registrationFees.value=fees
      console.log(`registrationFees ${registrationFees.value}`);
  }

  if(lodgingFees.checked){
      const fees=document.querySelector(`input[name="lodging"]:checked`).value
      lodgingFees.value=fees 
      console.log(`lodgingFees ${lodgingFees.value}`);
  }
  if(foodingFees.checked){
      foodingFees.value=3000
      console.log(`lfooding Fees ${foodingFees.value}`);
  }

  if(transportationFees.checked){
      const fees=document.querySelector(`input[name="transportation"]:checked`).value
      transportationFees.value=fees
  }
 
  if(monthlyDiscount.checked){
      const fees=document.getElementById("monthlyDisc").value
      monthlyDiscount.value=fees
      console.log(`monthlyDiscount ${monthlyDiscount.value}`);
  }
  if(otherDiscount.checked){
      const fees=document.getElementById("otherDisc").value
      otherDiscount.value=fees
      console.log(`otherDiscount ${otherDiscount.value}`);
  }
  if(registrationFees.checked){
    registrationFees=registrationFees.value
  }
  else{
    registrationFees=0
  }
  if(lodgingFees.checked){
    lodgingFees=lodgingFees.value
  }
  else{
    lodgingFees=0
  }
  if(foodingFees.checked){
    foodingFees=foodingFees.value
  }
  else{
    foodingFees=0
  }
  if(transportationFees.checked){
    transportationFees=transportationFees.value
  }
  else{
    transportationFees=0
  }
  if(monthlyDiscount.checked){
    monthlyDiscount=monthlyDiscount.value*1
  }
  else{
    monthlyDiscount=0
  }
  if(otherDiscount.checked){
    otherDiscount=otherDiscount.value*1
  }
  else{
    otherDiscount=0
  }

    admission5(registrationFees,
      lodgingFees,
      foodingFees,
      transportationFees,
      monthlyDiscount,
      otherDiscount);
  });
}

if (admission5updateBtn) {
  admission5updateBtn.addEventListener("submit", (e) => {
    e.preventDefault();
    let registrationFees=document.getElementById("registrationFees")
    let lodgingFees=document.getElementById("lodgingFees")
    let foodingFees=document.getElementById("foodingFees")
    let transportationFees=document.getElementById("transportationFees")
    let monthlyDiscount=document.getElementById("monthlyDiscount")
    let otherDiscount=document.getElementById("otherDiscount")
    if(registrationFees.checked){
        const fees=document.querySelector(`input[name="registration"]:checked`).value
        console.log(fees);
        registrationFees.value=fees
        console.log(`registrationFees ${registrationFees.value}`);
    }

    if(lodgingFees.checked){
        const fees=document.querySelector(`input[name="lodging"]:checked`).value
        lodgingFees.value=fees 
        console.log(`lodgingFees ${lodgingFees.value}`);
    }
    if(foodingFees.checked){
        foodingFees.value=3000
        console.log(`lfooding Fees ${foodingFees.value}`);
    }

    if(transportationFees.checked){
        const fees=document.querySelector(`input[name="transportation"]:checked`).value
        transportationFees.value=fees
    }
   
    if(monthlyDiscount.checked){
        const fees=document.getElementById("monthlyDisc").value
        monthlyDiscount.value=fees
        console.log(`monthlyDiscount ${monthlyDiscount.value}`);
    }
    if(otherDiscount.checked){
        const fees=document.getElementById("otherDisc").value
        otherDiscount.value=fees
        console.log(`otherDiscount ${otherDiscount.value}`);
    }
    if(registrationFees.checked){
      registrationFees=registrationFees.value
    }
    else{
      registrationFees=0
    }
    if(lodgingFees.checked){
      lodgingFees=lodgingFees.value
    }
    else{
      lodgingFees=0
    }
    if(foodingFees.checked){
      foodingFees=foodingFees.value
    }
    else{
      foodingFees=0
    }
    if(transportationFees.checked){
      transportationFees=transportationFees.value
    }
    else{
      transportationFees=0
    }
    if(monthlyDiscount.checked){
      monthlyDiscount=monthlyDiscount.value*1
    }
    else{
      monthlyDiscount=0
    }
    if(otherDiscount.checked){
      otherDiscount=otherDiscount.value*1
    }
    else{
      otherDiscount=0
    }
    console.log(registrationFees,
      lodgingFees,
      foodingFees,
      transportationFees,
      monthlyDiscount,
      otherDiscount);
    admission5update(registrationFees,
      lodgingFees,
      foodingFees,
      transportationFees,
      monthlyDiscount,
      otherDiscount);
  });
}

if(createPaymentBtn){
  createPaymentBtn.addEventListener("submit", (e) => {
    e.preventDefault();
   const discount=document.getElementById("paymentDisc").value
   const receptAmount=document.getElementById("receptAmount").value
   
    createPayment(discount,receptAmount);
  });
}

if(updateStudentBtn){
  updateStudentBtn.addEventListener("submit", (e) => {
    e.preventDefault();
    const sec=document.getElementById("studentSection").value
    const doa=document.getElementById("studentDoa").value
    const rollno=document.getElementById("studentRollno").value
    const data={sec,doa,rollno}
   console.log(data);
   updateStudent(data);
  });
}


if(deleteAdmissionBtn){
  console.log(deleteAdmissionBtn);
  for (let index = 0; index < deleteAdmissionBtn.length; index++) {
    deleteAdmissionBtn[index].addEventListener("click", (e) => {
        e.preventDefault();
        const id=deleteAdmissionBtn[index].dataset.id
        console.log(id);
  deleteAdmission(id);
  })
    
  };
}