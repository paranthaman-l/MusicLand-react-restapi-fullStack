import React, { useState, useEffect } from "react";
import { collection, where, getDocs, query, addDoc, onSnapshot } from "firebase/firestore";
import plans from "../plansDB.json";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { TiTickOutline } from "react-icons/ti";
import Button from "@mui/material/Button";
import { useStates } from "../States";
import { getUser } from "../Slice/userSlice";
import { useSelector } from "react-redux";
import { db } from "../Api/firebase";
import { loadStripe } from "@stripe/stripe-js";
const PlansDetails = () => {
  const { gotoPayment } = useStates();
  const [products, setProducts] = useState([]);
  const user = useSelector(getUser);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "products"), where("active", "==", true));

      const querySnapshot = await getDocs(q);
      const products = {};
      querySnapshot.forEach(async (doc) => {
        products[doc.id] = doc.data();

        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());

        const priceQuery = query(collection(doc.ref, "prices"));

        const priceSnap = await getDocs(priceQuery);
        priceSnap.docs.forEach((priceDoc) => {
          products[doc.id].prices = {
            priceId: priceDoc.id,
            priceData: priceDoc.data(),
          };
          //   console.log(priceDoc.id, " => ", priceDoc.data());
        });
      });
      setProducts(products);
    };
    fetchData();
  }, []);
  const loadCheckout = async (priceId) => {
    const docRef = await addDoc(
      collection(db, "customers", user.uid, "checkout_sessions"),
      {
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      }
    );
    onSnapshot(docRef, async (snapshot) => {
      const { error, sessionId } = snapshot.data();

      if (error) {
        alert(`An error occurred: ${error.message}`);
      }
      if (sessionId) {
        const stripe = await loadStripe(
          "pk_test_51MXNkiSDtyxcR8ytSxlGr4O2E8mBZlSHmc1cLIwXm62eBsjKykQL4j1aLCfEbMTrkvJJeveD4RzLja7lvJcJVNKQ00vYnQra4l"
        );
        stripe.redirectToCheckout({ sessionId });
      }
    });
  };
  return (
    <>
      <div className="flex flex-col h-full justify-center items-center max-lg:flex-col xax-lg:h-96 duration-300">
        <p className=" font-alata text-4xl text-mp-gray my-2">
          We've got a plan that's perfect for you
        </p>
        <p className="font-alata text-4xl text-mp-gray flex justify-center items-center flex-col my-2">
          Pick your Premium
          <p className="text-base my-2">
            Listen without limits on your phone, speaker, and other devices.
          </p>
        </p>
        <div className="flex justify-center h-full">
          {Object.entries(products).map(([productId, productData]) => {
            const answer_array = productData.description.split(".");
            return (
              <div
                key={productId}
                className="group flex flex-col h-3/4 justify-center items-center mx-5 cursor-pointer"
              >
                <p className="invisible font-bold font-alata group-hover:visible opacity-0 group-hover:opacity-90  duration-500 flex justify-center items-center text-mp-white bg-mp-violet w-72 rounded-t-lg">
                  {productData.name === "BASIC"
                    ? "Individual"
                    : productData.name === "ADVANCED"
                    ? "Duo"
                    : "Family"}
                </p>
                <Card
                  sx={{ width: 300, maxWidth: 345, backgroundColor: "white" }}
                  className="w-72 h-full duration-500 relative"
                >
                  <CardContent className="duration-500">
                    <p className="text-mp-green text-2xl mx-auto w-full flex justify-center items-center font-bold group-hover:text-mp-violet duration-500">
                      {productData.name.toUpperCase()}
                    </p>
                    <div className="mt-4">
                      <p className="flex items-center text-xl font-semibold">
                        <span className="flex">
                          <HiOutlineCurrencyRupee className="text-3xl" />
                          <span className="text-lg">
                            <span className="group-hover:text-mp-violet font-bold">
                              {productData.name === "BASIC"
                                ? "119"
                                : productData.name === "ADVANCED"
                                ? "169"
                                : "219"}
                            </span>
                            <span className="text-base">
                              {" "}
                              /month after offer period
                            </span>{" "}
                            {productData.name === "BASIC"
                              ? "1"
                              : productData.name === "ADVANCED"
                              ? "2"
                              : "5"}
                            <span className="text-base"> account</span>
                          </span>
                        </span>
                      </p>
                      <hr className="my-3 text-mp-gray" />
                    </div>
                    <div className="flex justify-center text-justify">
                      <ul>
                        {answer_array.map((offer, i) => {
                          return (
                            <li
                              key={i}
                              className="text-lg my-1 flex items-center"
                            >
                              <TiTickOutline className="mr-2 group-hover:text-mp-green text-xl" />
                              {offer}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </CardContent>
                  <CardActions className="flex justify-center items-center absolute w-full bottom-6">
                    <Button
                      variant="outlined"
                      className="w-52"
                      onClick={() => {
                        // gotoPayment();
                        loadCheckout(productData.prices.priceId);
                      }}
                    >
                      Select Plan
                    </Button>
                  </CardActions>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default PlansDetails;
