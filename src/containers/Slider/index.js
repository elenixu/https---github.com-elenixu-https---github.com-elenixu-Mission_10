import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) > new Date(evtB.date) ? -1 : 1  // <- modif < : > 
  ) ;
 
 
  const nextCard = () => {
    setTimeout(
      // modif index -> index + 1
      () => setIndex(index +1 < byDateDesc?.length ? index + 1 : 0),
      5000
    );
  };

  useEffect(() => {
    nextCard();
  });

  
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        // remplacement <> </> par une div pour contenir la key unique
        <div key={event.title}>
          <div 
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>

            
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc?.map((_, radioIdx) => (
                <input
                  // modif key event.id -> _.title
                  key={`${_.title}`}
                  type="radio"
                  name="radio-button"
                  // modif idx -> index
                  checked={index === radioIdx}
                  onChange={()=>null}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;