import React, { useState, useEffect } from "react";
// import styles from "@/styles/components/common/inquiryForm.module.css";
import MuiPhoneNumber from "material-ui-phone-number";
import emailjs from "@emailjs/browser";
import {
  TextField,
  InputAdornment,
  OutlinedInput,
  InputLabel,
  FormControl,
  ThemeProvider,
  Button,
  Slide,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@mui/material";
// import { theme } from "@/styles/theme";
// import Layout from "@/components/layout";
import "./form.css";
const Form = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    returnDate: "",
    deptDate: "",
    budget: "",
    dept: "",
    dest: "",
    msg: "",
  });
  const [showDialog, setShowDialog] = useState(false);
  const [sending, setSending] = useState(false);
  const handleSubmit = () => {
    setSending(true);
    if (
      form.name &&
      form.email &&
      form.phone &&
      form.returnDate &&
      form.deptDate &&
      form.budget &&
      form.dept &&
      form.dest &&
      form.msg
    ) {
      emailjs
        .send("service_1d21p96", "template_mqvxf7a", form, "tL_Vpyj5WxQRqs6ec")
        .then((res) => {
          console.log(res);
          setShowDialog({
            title: "Successfull",
            msg: "Inquiry sent successfully, We will call you for further processing.",
          });
          setSending(false);
        })
        .catch((err) => {
          console.log(err);
          setShowDialog({
            title: "Something went wrong",
            msg: "Inquiry not sent.",
          });
          setSending(false);
        });
    } else {
      setShowDialog({
        title: "Error",
        msg: "Kindly fill the Form.",
      });
      setSending(false);
    }
  };
  const handleChange = (e, fieldName) => {
    if (fieldName == "phone") {
      setForm({ ...form, phone: e });
    } else {
      setForm({ ...form, [fieldName]: e.target.value });
    }
  };

  console.log(form);
  return (
    <div>
      <div>
        {" "}
        <div className="container">
          <div className="row input-container">
            <div className="col-md-6">
              <div className="styled-input wide">
                <input
                  type="text"
                  required
                  onChange={(e) => handleChange(e, "name")}
                  value={form.name}
                />
                <label> Name</label>
              </div>
            </div>{" "}
            <div className="col-md-6 col-sm-12">
              <div className="styled-input">
                <input
                  type="text"
                  required
                  onChange={(e) => handleChange(e, "email")}
                  value={form.email}
                />
                <label>Email</label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="styled-input wide">
                <input
                  type="text"
                  required
                  onChange={(e) => handleChange(e, "budget")}
                  value={form.budget}
                />
                <label>Your Budget</label>
              </div>
            </div>{" "}
            <div className="col-md-6">
              <div className="styled-input wide">
                <input
                  type="text"
                  required
                  onChange={(e) => handleChange(e, "dept")}
                  value={form.dept}
                />
                <label>Departure</label>
              </div>
            </div>{" "}
            <div className="col-md-6">
              <div className="styled-input wide">
                <input
                  type="text"
                  required
                  onChange={(e) => handleChange(e, "dest")}
                  value={form.dest}
                />
                <label>Returning</label>
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="styled-input">
                <input
                  type="number"
                  required
                  onChange={(e) => handleChange(e.target.value, "phone")}
                />
                <label>Phone Number</label>
              </div>
            </div>{" "}
            <div className="col-md-6 col-sm-12">
              <div className="styled-input">
                <input
                  type="date"
                  placeholder="departure date"
                  onChange={(e) => handleChange(e, "deptDate")}
                />
                <label>Departure Date</label>
              </div>
            </div>{" "}
            <div className="col-md-6 col-sm-12">
              <div className="styled-input">
                <input
                  type="date"
                  placeholder="departure date"
                  onChange={(e) => handleChange(e, "returnDate")}
                />
                <label>Return Date</label>
              </div>
            </div>
            <div className="col-xs-12">
              <div className="styled-input wide">
                <textarea
                  required
                  onChange={(e) => handleChange(e, "msg")}
                  value={form.msg}
                ></textarea>
                <label>Message</label>
              </div>
            </div>
            <div className="col-xs-12">
              {" "}
              <div className="submit-btn">
                <button disabled={sending} onClick={() => handleSubmit()}>
                  Send{" "}
                </button>
              </div>
              <Dialog
                open={showDialog}
                keepMounted
                onClose={() => showDialog(false)}
              >
                <DialogTitle>{showDialog.title}</DialogTitle>
                <DialogContent>
                  <DialogContentText>{showDialog.msg}</DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setShowDialog(false)}>OK</Button>
                </DialogActions>
              </Dialog>
              {/* <div className=" submit-btn">Send Message</div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
