const { mailTransporter } = require("../utils/mailer");
const dataSets = [
  {
    name: "malaria",
    symptoms: ["high fever", "chills and sweats", "headaches"],
    recommendations:
      "Prevention is the key , so make sure to use mosquito nets while sleeping, wear protective clothing, and use insects repellents",
  },
  {
    name: "typhoid",
    symptoms: ["Abdominal pains", "loss of appetite", "sustained fever"],
    recommendations:
      "Typhoid is caused by the contamainated food or wTER . Good hygeine practices , such as the washing your hands reqularly, consuming clean water and eating properly cooked food, can help prevent typhoid",
  },
  {
    name: "HIV/AIDs",
    symptoms: [
      "swollen lymph nodes",
      "rapid weight loss",
      "persistent fatigue",
      "chronc diarrhea",
    ],
    recommendations:
      "Anti retroviral therapy (ART) is the primary treatment managing HIV/AIDs and can help control virus and improve quality of life",
  },
  {
    name: "fever",
    symptoms: ["sweating", "headache", "shivering or chills"],
    recommendations:
      "Hey its import to stay hydrated , and take over-the-counter fever reducers like acetaminophen or ibuprofen as directed",
  },
  {
    name: "acne",
    symptoms: ["pimples", "oily skin", "red inflamed skin"],
    recommendations:
      "wash face regularly with a gentle cleanser , avoiding excessive touching of the face, and using non-comedogenic skincare products",
  },
];
const subscribeHealthTips = async (email, ailments) => {
  const sicknessType = dataSets.find((ailment) => {
    return ailment.name == ailments;
  });
  if (!sicknessType) {
    return {
      response:
        "No health care or tips yet for this ailment, visit the our nearest clinic",
    };
  }
  const subcribe = await mailTransporter.sendMail({
    from: "Safe Health Plus",
    to: email,
    subject: "HealthPlus Clinic Decision System",
    html: `<div style="height:400px; background:lightgray; border:1px solid lightgray; border-radius:5px; padding:5px 10px; display:block; color:slate">
      <h1 style="color:green">Techncal Decision Support</h1>
        <h1>Symptoms</h1>

    <ul>
   <li> ${sicknessType.symptoms[0]}</li>
   <li> ${sicknessType.symptoms[1]}</li>
       <li> ${sicknessType.symptoms[2]}</li>
        
    </ul>
    <h1> Recommendation </h1>
    <p style="font-size:"18px"> Recommendation ${sicknessType.recommendations} </p>
  
     </div>`,
  });

  return {
    data: "Welcome on board, you have succesfully subscribe and will be will getting the decisions and health care tips from us.",
  };
};

setInterval(async () => {
  await subscribeHealthTips("alfredchrisayo@gmail.com");
}, 10000000);

const getDailyDecisionTips = async (req, res) => {
  const { email, ailments } = req.body;
  try {
    const reqData = await subscribeHealthTips(email, ailments);
    if (reqData)
      res.status(200).send({
        reqData,
      });
    else res.send(400).send({ response: "Operation Failed" });
  } catch (error) {
    res.send(error);
  }
};
module.exports = { getDailyDecisionTips };
