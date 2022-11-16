import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { query, limit } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { where } from "firebase/firestore";
import { startAfter } from "firebase/firestore";
import FaresPage from "../fares/fares";
import FareCard from "../fares/staticfarescard";
import Sendinquiry from "../sendinquiry/sendinquiry";
import Loader from "../../assets/loader/loader";
import LoadingButton from "@mui/lab/LoadingButton";
import FooterBanner from "../../components/footer-banner/footerbanner";

const SingleAirlinePage = () => {
  const params = useParams();
  const { name } = params;
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
        const arrOfData = [];
        const q = query(
          collection(db, "fares"),
          where("airline.name", "==", name),
          limit(10)
        );
        const querySnapshot = await getDocs(q);
        setLastDocu(querySnapshot.docs[querySnapshot.docs.length - 1]);
        querySnapshot.forEach((doc) => {
          arrOfData.push({ ...doc.data(), _id: doc.id });
        });
        setFares(arrOfData);
        // console.log(arrOfData);
        if (arrOfData.length === 0) {
          setIsEmpty(true);
        }
        if (arrOfData.length < 10) {
          setBlockApi(true);
        }
      } else if (fares.length > 0) {
        const arrOfData = [];
        const q = query(
          collection(db, "fares"),
          where("airline.name", "==", name),
          startAfter(lastDocu),
          limit(10)
        );
        const querySnapshot = await getDocs(q);
        setLastDocu(querySnapshot.docs[querySnapshot.docs.length - 1]);
        querySnapshot.forEach((doc) => {
          arrOfData.push({ ...doc.data(), _id: doc.id });
        });
        setFares([...fares, ...arrOfData]);
        if (arrOfData.length < 10) {
          setBlockApi(true);
        }
      }
      setFetching(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [skip]);

  console.log(fares);
  console.log(name);

  const [footerData, setFooterData] = useState(null);
  const [airline, setAirline] = useState(null);

  const getFooterData = async () => {
    const index = Math.floor(Math.random() * 13) + 1;
    console.log(index);
    const arrOfData = [];
    if (index) {
      const q = query(
        collection(db, "airlinesFooters"),
        where("name", "==", name)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        arrOfData.push({ ...doc.data(), _id: doc.id });
      });
      setFooterData(arrOfData[0]);
      console.log(arrOfData[0]);
    }
  };
  const getAirline = async () => {
    const index = Math.floor(Math.random() * 33) + 1;
    console.log(index);
    const arrOfData = [];
    if (index) {
      const q = query(collection(db, "airlines"), where("name", "==", name));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        arrOfData.push({ ...doc.data(), _id: doc.id });
      });
      setAirline(arrOfData[0]);
      console.log(arrOfData[0]);
    }
  };
  useEffect(() => {
    getFooterData();
    getAirline();
  }, []);
  console.log(airline);
  console.log(footerData);

  return (
    <div>
      {airline && (
        <div>
          <div className="footer__banner__image">
            <img src={airline.banner} alt="" />
          </div>
        </div>
      )}
      {fares.length > 0 ? (
        <div>
          {fares.map((fare) => (
            <div>
              <FareCard fare={fare} />
            </div>
          ))}
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
        </div>
      ) : (
        <div>
          {isEmpty ? (
            <Sendinquiry />
          ) : (
            <h1>
              <Loader />
            </h1>
          )}{" "}
        </div>
      )}
      {/* <>{isEmpty && <Sendinquiry h1="Send Inquiry" />}</> */}
      {/* <FooterBanner /> */}
      {footerData ? (
        <div className="container">
          <div className="footer__banner__heading">
            <h2>{footerData.mainTxt}</h2>
            <div className="line"></div>
          </div>
          <div className="footer-banner">
            {footerData.cards.map((item, i) => (
              <div>
                <div>
                  <div className="footer__large__img">
                    <img
                      src={item.img}
                      alt=""
                      className={i == 0 ? "first_card" : ""}
                    />
                    <div className="footer__large__img__content__mob">
                      <h2>{item.heading}</h2>
                      <p>{item.txt}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {airline && (
            <div>
              <div className="footer__banner__image">
                <img src={airline.banner} alt="" />
              </div>
            </div>
          )}
        </div>
      ) : (
        <FooterBanner />
      )}
    </div>
  );
};

export default SingleAirlinePage;
