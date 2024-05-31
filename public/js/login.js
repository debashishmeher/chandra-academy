const axios = require("axios");

const hideAlert = () => {
  const el = document.querySelector(".alert");
  if (el) {
    el.parentElement.removeChild(el);
  }
};

const showAlert = (status, message) => {
  hideAlert();
  const el = `<div class="alert alert-${status}">${message}</div>`;
  document.querySelector("body").insertAdjacentHTML("afterbegin", el);
  window.setTimeout(hideAlert, 3000);
};

exports.login = async (email, password) => {
  try {
    const response = await axios({
      method: "POST",
      url: "https://chandraacademysonepur.com/login",
      data: {
        email,
        password,
      },
      httpOnly: true,
    });

    if (response.data.status === "success") {
      showAlert("success", "Login Successful.");
      window.setTimeout(() => {
        location.assign("/");
      }, 1000);
    }
  } catch (err) {
    showAlert("err", err.response.data.message);
  }
};

exports.logout = async () => {
  try {
    const response = await axios({
      method: "get",
      url: "https://chandraacademysonepur.com/logout",
      httpOnly: true,
    });

    if (response.data.status === "success") {
      showAlert("success", "Logout Successful.");
      window.setTimeout(() => {
        location.assign("/");
      }, 1000);
    }
  } catch (err) {
    showAlert("err", err.response.data.message);
  }
};


exports.signup = async (name, email, password, confirmPassword) => {
  try {
    const response = await axios({
      method: "POST",
      url: "https://chandraacademysonepur.com/signup",
      data: {
        name,
        email,
        password,
        confirmPassword,
      },
      httpOnly: true,
    });

    if (response.data.status === "success") {
      showAlert("success", "Signup Successful.");
      window.setTimeout(() => {
        location.assign("/");
      }, 1000);
    }
  } catch (err) {
    showAlert("err", err.response.data.message);
  }
};
exports.forgot = async (email) => {
  try {
    const response = await axios({
      method: "POST",
      url: "https://chandraacademysonepur.com/forgot",
      data: {
        email,
      },
      httpOnly: true,
    });

    if (response.data.status === "success") {
      showAlert("success", "Link send to your E-mail, Please Check..");
    }
  } catch (err) {
    showAlert("err", err.response.data.message);
  }
};
exports.reset = async (password, confirmPassword) => {
  const resetToken = window.location.pathname.split("/")[2];
  try {
    const response = await axios({
      method: "patch",
      url: `https://chandraacademysonepur.com/resetPassword/${resetToken}`,
      data: {
        password,
        confirmPassword,
      },
      httpOnly: true,
    });

    if (response.data.status === "success") {
      showAlert("success", "Password Reset Successful.");
      window.setTimeout(() => {
        location.assign("/login");
      }, 1000);
    }
  } catch (err) {
    showAlert("err", err.response.data.message);
  }
};
exports.buying = async (productId) => {
  try {
    const resp = await axios(
      `https://chandraacademysonepur.com/product/checkout/${productId}`
    );
    if (resp.data.status === "success") {
      showAlert("success", "Redirect to Payment Successful.");

      const optionshow = {
        checkout: {
          method: {
            netbanking: "1", // Show netbanking
            card: "1", // Show card
            upi: "1", // Hide UPI
            wallet: "1", // Hide wallet
          },
        },
      };

      var options = {
        key: "rzp_test_SlbaOygYXkIp3A",
        amount: resp.data.order.amount,

        currency: "INR",
        name: "Acme Corp",
        description: "Test Transaction",
        image: "https://picsum.photos/200/300",
        order_id: resp.data.order.id,
        prefill: {
          name: "debashish meher",
          email: "debashishmeher955@gmail.com",
          contact: "7328899428",
        },
        options: optionshow,

        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      var rzp1 = new window.Razorpay(options);

      rzp1.open();
      e.preventDefault();
    }
  } catch (err) {
    showAlert("err", err.resp);
  }
};

exports.enroll = async (name, email, phone) => {
  try {
    const response = await axios({
      method: "POST",
      url: "https://chandraacademysonepur.com/enroll",
      data: {
        name,
        email,
        phone,
      },
      httpOnly: true,
    });

    if (response.data.status === "success") {
      showAlert("success", `Student ${response.data.name} Enroll Successful.`);
      window.setTimeout(() => {
        location.assign("/");
      }, 1000);
    }
  } catch (err) {
    showAlert("err", err.response.data.message);
  }
};
exports.admission = async () => {
  try {
    const response = await axios({
      method: "POST",
      url: "https://chandraacademysonepur.com/admission",

      httpOnly: true,
    });

    if (response.data.status === "success") {
      showAlert("success", "Admission Start");
      window.setTimeout(() => {
        location.assign(`/admission/${response.data.admission.id}/page1`);
      }, 1000);
    }
  } catch (err) {
    showAlert("err", err.response.data.message);
  }
};

exports.admission1 = async (name, phone, studentclass,medium, dob, gender, adhar) => {
  const admissionId = window.location.pathname.split("/")[2];
  try {
    const response = await axios({
      method: "POST",
      url: `https://chandraacademysonepur.com/admission/${admissionId}/page1`,
      data: {
        name,
        phone,
        studentclass,
        medium,
        dob,
        gender,
        adhar,
      },
      httpOnly: true,
    });

    if (response.data.status === "success") {
      showAlert("success", "Student Information Section Completed");
      window.setTimeout(() => {
        location.assign(`/admission/${admissionId}/page2`);
      }, 1000);
    }
  } catch (err) {
    showAlert("err", "Student Information Section Incomplete");
  }
};

exports.admission1update = async (name, phone, studentclass,medium, dob, gender, adhar) => {
  const admissionId = window.location.pathname.split("/")[2];
  try {
    const response = await axios({
      method: "patch",
      url: `https://chandraacademysonepur.com/admission/${admissionId}/page1`,
      data:{
        name, phone, studentclass,medium, dob, gender, adhar
      },
      httpOnly: true,
    });

    if (response.data.status === "success") {
      showAlert("success", response.data.message);
      window.setTimeout(() => {
        location.assign(`/admission/${admissionId}/page2`);
      }, 1000);
    }
  } catch (err) {
    showAlert("err", "Admission failed");
  }
};

exports.admission2 = async (
  nationallity,
  religion,
  catagory,
  fatherName,
  motherName
) => {
  const admissionId = window.location.pathname.split("/")[2];
  try {
    const response = await axios({
      method: "POST",
      url: `https://chandraacademysonepur.com/admission/${admissionId}/page2`,
      data: {
        nationallity,
        religion,
        catagory,
        fatherName,
        motherName,
      },
      httpOnly: true,
    });

    if (response.data.status === "success") {
      showAlert("success", "Additional Information Completed");
      window.setTimeout(() => {
        location.assign(`/admission/${admissionId}/page3`);
      }, 1000);
    }
  } catch (err) {
    showAlert("err", "Additional Information Incomplete");
  }
};

exports.admission2update = async (
  nationallity,
  religion,
  catagory,
  fatherName,
  motherName
) => {
  const admissionId = window.location.pathname.split("/")[2];
  try {
    const response = await axios({
      method: "patch",
      url: `https://chandraacademysonepur.com/admission/${admissionId}/page2`,
      data: {
        nationallity,
        religion,
        catagory,
        fatherName,
        motherName,
      },
      httpOnly: true,
    });

    if (response.data.status === "success") {
      showAlert("success", response.data.message);
      window.setTimeout(() => {
        location.assign(`/admission/${admissionId}/page3`);
      }, 1000);
    }
  } catch (err) {
    showAlert("err", "admission failed");
  }
};

exports.admission3 = async (
  village,
  postOffice,
  policeStation,
  pin,
  dist,
  transport,
  stay
) => {
  const admissionId = window.location.pathname.split("/")[2];
  try {
    const response = await axios({
      method: "POST",
      url: `https://chandraacademysonepur.com/admission/${admissionId}/page3`,
      data: {
        village,
        postOffice,
        policeStation,
        pin,
        dist,
        transport,
        stay,
      },
      httpOnly: true,
    });

    if (response.data.status === "success") {
      showAlert("success", "Address Details Completed");
      window.setTimeout(() => {
        location.assign(`/admission/${admissionId}/page4`);
      }, 1000);
    }
  } catch (err) {
    showAlert("err", "Address Details Incomplete");
  }
};

exports.admission3update = async (
  village,
  postOffice,
  policeStation,
  pin,
  dist,
  transport,
  stay
) => {
  const admissionId = window.location.pathname.split("/")[2];
  try {
    const response = await axios({
      method: "patch",
      url: `https://chandraacademysonepur.com/admission/${admissionId}/page3`,
      data: {
        village,
        postOffice,
        policeStation,
        pin,
        dist,
        transport,
        stay,
      },
      httpOnly: true,
    });

    if (response.data.status === "success") {
      showAlert("success", response.data.message);
      window.setTimeout(() => {
        location.assign(`/admission/${admissionId}/page4`);
      }, 1000);
    }
  } catch (err) {
    showAlert("err", "admission failed");
  }
};

exports.admission5 = async (
  registrationFees,
  lodgingFees,
  foodingFees,
  transportationFees,
  monthlyDiscount,
  otherDiscount
) => {
  const admissionId = window.location.pathname.split("/")[2];
  try {
    const response = await axios({
      method: "POST",
      url: `https://chandraacademysonepur.com/admission/${admissionId}/page5`,
      data: {
        registrationFees,
        lodgingFees,
        foodingFees,
        transportationFees,
        monthlyDiscount,
        otherDiscount
      },
      httpOnly: true,
    });

    if (response.data.status === "success") {
      showAlert("success", "Payment Section Updated");
      window.setTimeout(() => {
        location.assign(`/admission/${admissionId}`);
      }, 1000);
    }
  } catch (err) {
    showAlert("err", "Payment Section Incomplete");
  }
};

exports.admission5update = async (
  registrationFees,
  lodgingFees,
  foodingFees,
  transportationFees,
  monthlyDiscount,
  otherDiscount
) => {
  const admissionId = window.location.pathname.split("/")[2];
  console.log(registrationFees,
    lodgingFees,
    foodingFees,
    transportationFees,
    monthlyDiscount,
    otherDiscount);
  try {
    const response = await axios({
      method: "patch",
      url: `https://chandraacademysonepur.com/admission/${admissionId}/page5`,
      data: {
        registrationFees,
        lodgingFees,
        foodingFees,
        transportationFees,
        monthlyDiscount,
        otherDiscount
      },
      httpOnly: true,
    });

    if (response.data.status === "success") {
      showAlert("success", "Payment Section Updated");
      window.setTimeout(() => {
        location.assign(`/admission/${admissionId}`);
      }, 1000);
    }
  } catch (err) {
    showAlert("err", "Payment Section Incomplete");
  }
};



exports.admission4=async(formData)=>{
  const config={
    headers: {
      "Content-Type": "multipart/form-data",
    }
  }
  const admissionId = window.location.pathname.split("/")[2];
  console.log(admissionId,formData);
  try {
    const response=await axios({
     method:"post",
     url:`https://chandraacademysonepur.com/admission/${admissionId}/page4`,
     data:formData,
     config
    })
    
    if (response.data.status === "success") {
      showAlert("success", "Documents Uploaded");
      window.setTimeout(() => {
        location.assign(`/admission/${admissionId}/page5`);
      }, 1000);
    }
  }
  catch(err){
    showAlert("err", "Please Upload Documents Properly");
  }
}

exports.admission4update=async(formData)=>{
  const config={
    headers: {
      "Content-Type": "multipart/form-data",
    }
  }
  const admissionId = window.location.pathname.split("/")[2];
  try {
    const response=await axios({
     method:"patch",
     url:`https://chandraacademysonepur.com/admission/${admissionId}/page4`,
     data:formData,
     config
    })
    
    if (response.data.status === "success") {
      showAlert("success", "all documents uploaded");
      window.setTimeout(() => {
        location.assign(`/admission/${admissionId}/page5`);
      }, 1000);
    }
  }
  catch(err){
    showAlert("err", "admission failed");
  }
}


exports.createStudent = async () => {
  const admissionId = window.location.pathname.split("/")[2];
  try {
    const response = await axios({
      method: "post",
      url: `https://chandraacademysonepur.com/admission/${admissionId}/student`,
      httpOnly: true,
    });
    
    if (response.data.status === "success") {
      showAlert("success", "student create successfully.");
      window.setTimeout(() => {
        location.assign(`/admin/student/${response.data.student.id}`);
      }, 1000);
    }
  } catch (err) {
    showAlert("err", err.response.data.message);
  }
};
exports.deleteAdmission = async (id) => {
  const admissionId = id
  try {
    const response = await axios({
      method: "delete",
      url: `http://localhost:4000/admission/${admissionId}`,
      httpOnly: true,
    });
    
    if (response.data.status === "success") {
      showAlert("success", response.data.message);
      location.assign("/admin/admission");
    }
  } catch (err) {
    showAlert("err", err.response.data.message);
  }
};

exports.updateStudent = async (updateData) => {
  console.log(updateData);
  console.log("update student");
  const admissionId = window.location.pathname.split("/")[3];
  try {
    const response = await axios({
      method: "patch",
      url: `http://localhost:4000/admin/student/${admissionId}/updateStudent`,
      httpOnly: true,
      data:updateData
    });
    if (response.data.status === "success") {
      showAlert("success", "update student");
      window.setTimeout(() => {
        location.assign(`/admin/student/${admissionId}`);
      }, 1000);
    }
  } catch (err) {
    showAlert("err", err.response.data.message);
  }
};

exports.createPayment = async (discount,receptAmount) => {
  const studentId = window.location.pathname.split("/")[3];
  try {
    const response = await axios({
      method: "post",
      url: `https://chandraacademysonepur.com/admin/student/${studentId}/payment`,
      data:{
        discount,receptAmount
      },
      httpOnly: true,
    });

    if (response.data.status === "success") {
      showAlert("success", "student create successfully.");
      window.setTimeout(() => {
        location.assign(`/admin/student/${studentId}/paymentHistory`);
      }, 1000);
    }
  } catch (err) {
    showAlert("err", err.response.data.message);
  }
};