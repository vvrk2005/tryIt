import React, { useState, useEffect } from 'react';
import Stringify from 'react-stringify'
import ReactDOM from "react-dom";

const Product = ({ match }) => {
  const link = match.params.link;

  const [stiboSummery, getStiboSummary] = useState({ title: '', metaDescription: '' });

  const [images, getImages] = useState({ imageType: '', url: '' });
  
  const [hidden, setHidden] = useState(true);
  const [bodyText, setBodyText] = useState([]);

  useEffect(() => {

    const stiboData = async () => {
      try {
        const summeryResult = await fetch(`/page/en_US/${link.split('/')[0]}/summary`);
        const summaryBody = await summeryResult.json();

        const imageResult = await fetch(`/page/en_US/${link.split('/')[0]}/images`);
        const imageBody = await imageResult.json();
        const bodyResult = await fetch(`/page/en_US/${link.split('/')[0]}/body_text`);
        const bodyTextResult = await bodyResult.json();
               
        setBodyText([bodyTextResult.textElementsByType]);
        console.log(bodyTextResult.textElementsByType);
        
        imageBody[0].url = "https://us.vwr.com" + imageBody[0].url;
        getStiboSummary(summaryBody);
        getImages(imageBody[0]);
        

      } catch (error) {
        getStiboSummary({ title: "error", error });
      }

    }

    stiboData();


  }, [link]);

  
  function LessText({ text, maxLength }) {
    if (text <= maxLength) {
      return <span>{text}</span>;
    }
    return (
      <span>
        {hidden
          ? `${text.substr(0, maxLength).trim()} ...`
          : text}
        {hidden ? (
          <a onClick={() => setHidden(false)}> read more</a>
        ) : (
            <a onClick={() => setHidden(true)}> read less</a>
          )}
      </span>
    );
  }

  return (

    <div class="container">
      <div class="col-lg-3"></div>
      <div class="row col-lg-9">

        <div class="col-xs-12">
          <h1 class="page-title mb-1"><span > {stiboSummery.title}</span></h1>
        </div>

        <div class="col-xs-12 col-md-5">
          <img src={images.url} />
        </div>
        <div class="col-xs-12 col-md-7">
          <div class="textBodyText">
            <LessText
              text={stiboSummery.metaDescription}
              maxLength={500}
            />
          </div>
          
           
           {/* {JSON.stringify(bodyText)} */}
           <div>
           {bodyText && bodyText.map((c, index)=>(
            <div key={index}>
              {c.BodyText.map((b, index1)=>(
                <div key={index1}>
                  <hr/>
                  {b.contents[0]}
                </div>
              ))}
              {c.BulletPoint.map((b, index1)=>(
                <div key={index1}>
                  <hr/>
                  <ul>
                  {b.contents.map((a, index2) =>(
                    <div key={index2}>
                    <li>{b.contents[index2]}</li>
                    </div>
                  ))}
                  </ul>
                </div>
              ))}
                
              {c.BodyText.map((b, index1)=>(
                <div key={index1}>
                  {b.contents[1]}
                </div>
              ))}
              </div>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
