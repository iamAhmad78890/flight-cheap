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
import twowayplane from "../../images/twowayplane.png";
import "./singledestinationfares.css";
const SingleDestinationFares = () => {
  const params = useParams();
  const { name } = params;
  const [fares, setFares] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [skip, setSkip] = useState(0);
  let [lastDocu, setLastDocu] = useState();
  const [fetching, setFetching] = useState();
  const [blockApi, setBlockApi] = useState(false);
  const [destData, setDestData] = useState(null);

  const getData = async () => {
    if (!blockApi) {
      setFetching(true);
      if (fares.length == 0) {
        const arrOfData = [];
        const q = query(
          collection(db, "fares"),
          where("destCountry.name", "==", name),
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
          where("destCountry.name", "==", name),
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
  const getDestination = async () => {
    const arrOfData = [];
    const q = query(collection(db, "destinations"), where("name", "==", name));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      arrOfData.push({ ...doc.data(), _id: doc.id });
    });
    setDestData(arrOfData[0]);
  };

  useEffect(() => {
    getData();
    getDestination();
  }, [name]);

  useEffect(() => {
    getData();
  }, [skip]);

  // console.log(fares);
  // console.log(name);

  return (
    <div style={{ marginTop: "100px", position: "relative" }}>
      {fares.length > 0 ? (
        <div>
          {fares.map((fare) => (
            <>
              <FareCard fare={fare} />
            </>
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
      {destData && (
        <div
          className="single-destination-content"
          // contentEditable="true"
          dangerouslySetInnerHTML={{ __html: destData?.details }}
        />
      )}
      <FooterBanner />
    </div>
  );
};

export default SingleDestinationFares;
