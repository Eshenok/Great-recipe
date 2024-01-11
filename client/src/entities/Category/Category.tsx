import React, {useContext, useEffect, useRef, useState} from 'react';
import {TEXTS} from "../../constants";
import {LanguageContext} from "../../context/LanguageContext";
import CategoryItem from "./components/CategoryItem/CategoryItem";
import CheckSwitch from "../../shared/CheckSwitch/CheckSwitch";
import Title from "../../shared/Title/Title";

const Category = () => {

  const context = useContext(LanguageContext);
  const containerRef = useRef(null);
  const [startX, setStartX] = useState(0);

  // useEffect(() => {
  //   const handleResize = () => {
  //     if (window.innerWidth < 725) {
  //       containerRef.current.style.overflowX = 'hidden'
  //     } else {
  //       containerRef.current.style.overflowX = 'auto'
  //     }
  //   }
  //
  //   handleResize();
  //   window.addEventListener('resize', handleResize);
  //
  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, [])

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX)
  }

  const handleTouchMove = (e) => {
    const deltaX = e.touches[0].clientX - startX;
    containerRef.current.scrollLeft -= deltaX;
    setStartX(e.touches[0].clientX);
    e.preventDefault();
  };

  return (
    <div
      className={"category"}
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <Title text={TEXTS[context].titles.infridge} />
      <CheckSwitch name={'infridge'} color={'blue'} />
      <Title text={TEXTS[context].titles.category} />
      {
        Object.entries(TEXTS[context].categories).map(([key, category]) => (
          <CategoryItem key={key} text={category.name} icon={category.image} />
        ))
      }
    </div>
  );
};

export default Category;
