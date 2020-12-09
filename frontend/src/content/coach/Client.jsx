import React from "react";
import { useParams, Link } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import "../../styles/client_document.css";
import Image from "../../assets/images/profile.png";
import Email from "../../assets/images/email.png";
import Phone from "../../assets/images/phone.png";
import { Line } from "react-chartjs-2";
import { LoaderLarge } from "../../components/Loaders/Loaders";

const GET_CLIENT_DATA = gql`
  query GetClientData($id: Int!) {
    client(limit: 1, where: { id: { _eq: $id } }) {
      weight
      user_id
      surname
      profession
      postal
      phone
      name
      id
      height
      email
      dob
      city
      address
    }
    weight(
      distinct_on: date
      where: { user: { clients: { id: { _eq: $id } } } }
      order_by: { date: asc, created_at: desc }
    ) {
      id
      created_at
      date
      weight
    }
  }
`;

export default function Client() {
  const { id } = useParams();

  const request = useQuery(GET_CLIENT_DATA, {
    variables: {
      id: id,
    },
  });

  const { data, loading } = request;

  let dataSet = [];
  let labelsSet = [];
  let client = undefined;

  if (loading) {
    return <LoaderLarge />;
  }
  if (data) {
    client = data.client[0];
    if (data.weight) {
      data.weight.map((item) => {
        dataSet.push(item.weight);
        labelsSet.push(item.date);
      });
    }
  }

  console.log(data);

  const state = {
    labels: labelsSet,
    datasets: [
      {
        label: "Weight",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "#f0f4f7",
        borderColor: "#00c49a",
        borderWidth: 4,
        data: dataSet,
      },
    ],
  };

  return (
    <section className="client client-grid">
      <h1 className="hidden">Client document</h1>
      <article className="client-stats padding  rounded shadow">
        <h1 className="client-stats-title subtitle">Client stats</h1>
        <button className="button-viewPhotos shadow">View photos</button>
        <div className="client-stats-information">
          <p className="weight">92.1kg</p>
          <p className="title">Starting weight</p>
          <p className="lastweight">90.1kg</p>
          <p className="title">Last weigh in</p>
          <p className="lostgained">-0.08kg</p>
          <p className="title">Avg. weight lost/gained per week</p>
          <p className="totalcalories">2800</p>
          <p className="title">Calories per day</p>
          <p className="avgcals">5654</p>
          <p className="title">Avg. steps per day</p>
        </div>
        <div className="client-stats-pics">
          <Line
            data={state}
            height="80"
            options={{
              scales: {
                xAxes: [
                  {
                    type: "time",
                    time: {
                      unit: "day",
                      displayFormats: {
                        millisecond: "MMM D",
                        second: "MMM D",
                        minute: "MMM D",
                        hour: "MMM D",
                        day: "MMM D",
                        week: "MMM D",
                        month: "MMM D",
                        quarter: "MMM D",
                        year: "MMM D",
                      },
                    },
                  },
                ],
              },
              maintainAspectRatio: false,
              title: {
                display: true,
                text: "Weight",
                fontSize: 20,

                fontWeight: 600,
                fontFamily: "Poppins",
              },
              legend: {
                display: false,
                position: "right",
              },
            }}
          />
        </div>
      </article>
      <div className="client-buttons">
        <Link
          className="client-button client-button-workout rounded shadow"
          to={`${data.client[0].id}/workout`}
        >
          <article className="client-workoutplan">
            <h1 className="client-workout-button">Workout plan</h1>
          </article>
        </Link>
        <Link
          className="client-button client-button-diet rounded shadow"
          to={`${data.client[0].id}/diet`}
        >
          <article className="client-diet-button">
            <h1 className="client-diet-button">Diet plan</h1>
          </article>
        </Link>
      </div>
      <article className="client-sidebar padding rounded shadow">
        <h1 className="hidden">Client information</h1>
        <div className="client-sidebar-top rounded">
          <img width="100" height="100" src={Image}></img>
          <div>
            <p className="client-name">
              {client.surname} {client.name}
            </p>
            <p className="client-dob">{client.dob}</p>
          </div>
        </div>
        <button>More button</button>
        <div className="client-sidebar-information">
          <div className="sidebar-container-address">
            <p className="smalltext address">Address</p>
            <p className="client-sidebar-input">{client.address}</p>
          </div>
          <div>
            <p className="smalltext postcode">Postal</p>
            <p className="client-sidebar-input">{client.postal}</p>
          </div>
          <div>
            <p className="smalltext city">City</p>
            <p className="client-sidebar-input">{client.city}</p>
          </div>
          <div>
            <p className="smalltext dob">Age</p>
            <p className="client-sidebar-input">20 Jaar</p>
          </div>
          <div>
            <p className="smalltext height">Height</p>
            <p className="client-sidebar-input">{client.height}cm</p>
          </div>
          <div>
            <p className="smalltext profession">Profession</p>
            <p className="client-sidebar-input">{client.profession}</p>
          </div>
          <div>
            <p className="smalltext bmi">BMI</p>
            <p className="client-sidebar-input">24.1</p>
          </div>
          <div className="contact">
            <p className="smalltext">Contact information</p>
            <div className="contact-item">
              <img width="21" height="16" src={Email} alt="" />
              <p className="client-sidebar-input">{client.email}</p>
            </div>
            <div className="contact-item">
              <img width="16" height="16" src={Phone} alt="" />
              <p className="client-sidebar-input">{client.phone}</p>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
