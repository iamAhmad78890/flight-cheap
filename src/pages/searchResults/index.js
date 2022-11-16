import React, { useEffect, useState } from "react";
import { db } from "../../lib/firebase";
import { convertString } from "../../utils/helpers";
import FareCard from "../fares/staticfarescard";

import {
  collection,
  query,
  where,
  getDocs,
  limit,
  startAfter,
} from "firebase/firestore";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./index.css";
import LoadingButton from "@mui/lab/LoadingButton";
import Sendquerry from "../sendinquiry/sendinquiry";
import Loader from "../../assets/loader/loader";
import FooterBanner from "../../components/footer-banner/footerbanner";

const Searchresults = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const dest = params.get("dest");
  const dept = params.get("dept");
  const [fares, setFares] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [skip, setSkip] = useState(0);
  let [lastDocu, setLastDocu] = useState();
  const [fetching, setFetching] = useState();
  const [blockApi, setBlockApi] = useState(false);

  const getData = async () => {
    if (!blockApi) {
      setFetching(true);
      if (fares.length == 0) {
        if (dest != "all" && dept != "all") {
          const arrOfData = [];
          const q = query(
            collection(db, "fares"),
            where("deptAirport.airportCode", "==", dept),
            where("destAirport.airportCode", "==", dest),
            limit(10)
          );
          const querySnapshot = await getDocs(q);
          setLastDocu(querySnapshot.docs[querySnapshot.docs.length - 1]);
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            arrOfData.push({ ...doc.data(), _id: doc.id });
          });
          setFares(arrOfData);
          console.log("search by both");
          if (arrOfData.length === 0) {
            setIsEmpty(true);
          }
          if (arrOfData.length < 10) {
            setBlockApi(true);
          }
          setFetching(false);
          return;
        } else if (dept != "all") {
          const arrOfData = [];
          const q = query(
            collection(db, "fares"),
            where("deptAirport.airportCode", "==", dept),
            limit(10)
          );
          const querySnapshot = await getDocs(q);
          setLastDocu(querySnapshot.docs[querySnapshot.docs.length - 1]);
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            arrOfData.push({ ...doc.data(), _id: doc.id });
          });
          setFares(arrOfData);
          console.log("search by dept");
          if (arrOfData.length === 0) {
            setIsEmpty(true);
          }
          if (arrOfData.length < 10) {
            setBlockApi(true);
          }
          setFetching(false);
          return;
        } else if (dest != "all") {
          const arrOfData = [];
          const q = query(
            collection(db, "fares"),
            where("destAirport.airportCode", "==", dest),
            limit(10)
          );
          const querySnapshot = await getDocs(q);
          setLastDocu(querySnapshot.docs[querySnapshot.docs.length - 1]);
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            arrOfData.push({ ...doc.data(), _id: doc.id });
          });
          setFares(arrOfData);
          console.log("search by dest");
          if (arrOfData.length === 0) {
            setIsEmpty(true);
          }
          if (arrOfData.length < 10) {
            setBlockApi(true);
          }
          setFetching(false);
          return;
        }
      } else if (fares.length > 0) {
        if (dest != "all" && dept != "all") {
          const arrOfData = [];
          const q = query(
            collection(db, "fares"),
            where("deptAirport.airportCode", "==", dept),
            where("destAirport.airportCode", "==", dest),
            startAfter(lastDocu),
            limit(10)
          );
          const querySnapshot = await getDocs(q);
          setLastDocu(querySnapshot.docs[querySnapshot.docs.length - 1]);
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            arrOfData.push({ ...doc.data(), _id: doc.id });
          });
          setFares([...fares, ...arrOfData]);
          console.log("search by both");
          if (arrOfData.length === 0) {
            setIsEmpty(true);
          }
          if (arrOfData.length < 10) {
            setBlockApi(true);
          }
          setFetching(false);
          return;
        } else if (dept != "all") {
          const arrOfData = [];
          const q = query(
            collection(db, "fares"),
            where("deptAirport.airportCode", "==", dept),
            startAfter(lastDocu),
            limit(10)
          );
          const querySnapshot = await getDocs(q);
          setLastDocu(querySnapshot.docs[querySnapshot.docs.length - 1]);
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            arrOfData.push({ ...doc.data(), _id: doc.id });
          });
          setFares([...fares, ...arrOfData]);
          console.log("search by dept");
          if (arrOfData.length === 0) {
            setIsEmpty(true);
          }
          if (arrOfData.length < 10) {
            setBlockApi(true);
          }
          setFetching(false);
          return;
        } else if (dest != "all") {
          const arrOfData = [];
          const q = query(
            collection(db, "fares"),
            where("destAirport.airportCode", "==", dest),
            startAfter(lastDocu),
            limit(10)
          );
          const querySnapshot = await getDocs(q);
          setLastDocu(querySnapshot.docs[querySnapshot.docs.length - 1]);
          querySnapshot.forEach((doc) => {
            arrOfData.push({ ...doc.data(), _id: doc.id });
          });
          setFares([...fares, ...arrOfData]);
          console.log("search by dest");
          if (arrOfData.length === 0) {
            setIsEmpty(true);
          }
          if (arrOfData.length < 10) {
            setBlockApi(true);
          }
          setFetching(false);
          return;
        }
      }
    }
  };

  useEffect(() => {
    if (dept && dest) {
      getData();
    }
  }, [dest, dept]);

  useEffect(() => {
    if (dept && dest) {
      getData();
    }
  }, [skip]);

  console.log(fares);

  return (
    <div>
      <div className="fares__page">
        {fares.map((fare) => (
          // <div className="fares__card__page" key={fare._id}>
          //   <div className="fares__card">
          //     <div className="plane__style">
          //       <i class="fa fa-plane" aria-hidden="true"></i>{" "}
          //     </div>
          //     <div>
          //       <img alt="" src={fare.airline.img} />
          //     </div>
          //     <div className="fares__travel">
          //       <div className="child1">
          //         <div>
          //           <h1>
          //             {convertString(fare.deptAirport.city)}{" "}
          //             <div>
          //               {" "}
          //               <span>
          //                 {" "}
          //                 <i
          //                   className="fa fa-long-arrow-right"
          //                   aria-hidden="true"></i>
          //               </span>{" "}
          //             </div>{" "}
          //           </h1>
          //           <p>{convertString(fare.deptCountry.name)}</p>
          //         </div>
          //       </div>
          //       <div className="child2">
          //         <h1>{convertString(fare.destAirport.city)} </h1>
          //         <div>
          //           {" "}
          //           <span>
          //             {" "}
          //             <i
          //               className="fa fa-long-arrow-left"
          //               aria-hidden="true"></i>
          //           </span>{" "}
          //         </div>{" "}
          //         <p className="country__name">
          //           {convertString(fare.destCountry.name)}
          //         </p>
          //       </div>
          //     </div>
          //     <div>
          //       <div>
          //         <p>
          //           <br />
          //           <span className="price__fare">
          //             {" "}
          //             <i className="fa fa-gbp"></i>
          //             {fare.price}
          //           </span>{" "}
          //           <br />
          //           <span className="subject__availability">
          //             Subject to Availability
          //           </span>
          //           <br />
          //         </p>
          //         <span>
          //           <br />
          //           <i className="fa fa-gbp"> Per Person</i>
          //         </span>
          //         <br />
          //       </div>
          //     </div>
          //   </div>
          //   <div className=" columns">
          //     <div className="column ">
          //       <span className="icon__styled">
          //         <i
          //           className="fa fa-phone"
          //           style={{ fontSize: "20px", color: "#FF5722;" }}></i>
          //         <a className="phone__styled" href=" #">
          //           0322000000
          //         </a>
          //       </span>
          //     </div>{" "}
          //     <div className="column " style={{ visibility: "hidden" }}>
          //       <input type="submit" className="btn " value="032200000" />
          //     </div>{" "}
          //     <div className="column space__column  ">
          //       <button
          //         className="btn"
          //         // onClick={() => {
          //         //   // navigate("/sendinquiry");

          //         // }}
          //         onClick={() => {
          //           navigate("/sendinquiry");
          //         }}>
          //         Send Inquiry
          //       </button>
          //     </div>
          //   </div>
          // </div>
          <FareCard fare={fare} />
        ))}
        {fares.length == 0 && !isEmpty && (
          <div>
            <Loader />
          </div>
        )}
        {fares.length > 0 && (
          <div style={{ textAlign: "center" }}>
            <LoadingButton
              sx={{ margin: "1rem", width: "10%", textAlign: "center" }}
              loading={fetching}
              disabled={blockApi}
              onClick={() => setSkip(skip + 1)}
              variant="contained"
            >
              {blockApi ? "No More" : "More"}
            </LoadingButton>
          </div>
        )}
        <>{isEmpty && <Sendquerry h1="Send Inquiry" />}</>
      </div>
      <FooterBanner />
    </div>
  );
};
export default Searchresults;
