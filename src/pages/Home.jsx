import { useState, useEffect, useCallback } from "react";
import "../App.css";
import "../styles/Home.css";

const mapFlavors = [
  {
    name: "Lemon",
    fruitCan: "/lemonCan.png",
    fruit: "/lemon.png",
    backgroundColor: "#f4d453",
    flavorDescription:
      "The organic lemon soda tingles refreshingly on the tongue, with a crisp, zesty acidity from freshly squeezed lemons.",
    ingredients: [
      "Lemon ipsum dolor sit amet",
      "Consetetur sadipscing elitr",
      "Adipiscing elit, sed do eiusmod tempor",
      "Ut labore et dolore magna aliqua.",
    ],
  },
  {
    name: "Apple",
    fruitCan: "/appleCan.png",
    fruit: "/apple.png",
    backgroundColor: "#ea3f48",
    flavorDescription:
      "The organic apple soda is crisp and refreshing, with a burst of sweet, juicy apples.",
    ingredients: [
      "Blueberry ipsum dolor sit amet",
      "Sed do eiusmod tempor incididunt",
      "Adipiscing elit, sed do eiusmod tempor",
      "Ut labore et dolore magna aliqua.",
    ],
  },
  {
    name: "Blueberry",
    fruitCan: "/blueberryCan.png",
    fruit: "/blueberry.png",
    backgroundColor: "#8b90ae",
    flavorDescription:
      "The organic blueberry soda is vibrant and tangy, with a burst of sweet, wild blueberries.",
    ingredients: [
      "Apple ipsum dolor sit amet",
      "Consetetur sadipscing elitr",
      "Sed do eiusmod tempor incididunt",
      "Ut labore et dolore magna aliqua.",
    ],
  },
  {
    name: "Peach",
    fruitCan: "/peachCan.png",
    fruit: "/peach.png",
    backgroundColor: "#f9af3c",
    flavorDescription:
      "The organic peach soda is sweet and juicy, with a smooth, mellow flavor of ripe peaches.",
    ingredients: [
      "Peach ipsum dolor sit amet",
      "Sed do eiusmod tempor incididunt",
      "Ut labore et dolore magna aliqua",
      "Lorem ipsum dolor sit amet.",
    ],
  },
  {
    name: "Unlocking the Power",
    fruitCan: "/peachCan.png",
    fruit: "/waterDrops.png",
    backgroundColor: "#f9af3c",
    flavorDescription:
      "a refreshing lemonade crafted with natural ingredients to quench your thirst. This fizzy blend combines fruity flavors with a hint of sweetness for a revitalizing taste experience. Enjoy the unique flavor and pure refreshment in every sparkling sip of NaturalFizz.",
    ingredients: [
      <h3>Special ipsum dolor sit amet </h3>,
      "Ut labore et dolore magna aliqua.",
      "Ut labore et dolore magna aliqua."

    ],
  },
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  // const isLastIndex = currentIndex === mapFlavors.length - 1;
  const [direction, setDirection] = useState(null);

  const handleScroll = useCallback((e) => {
    if (isAnimating) return;

    const direction = e.deltaY > 0 ? "down" : "up";
    setDirection(direction);

    if (currentSection === 0) {
      if (direction === "down" && currentIndex < mapFlavors.length - 1) {
        startAnimation(() => setCurrentIndex((prevIndex) => prevIndex + 1));
      } else if (direction === "up" && currentIndex > 0) {
        startAnimation(() => setCurrentIndex((prevIndex) => prevIndex - 1));
      } else if (direction === "down" && currentIndex === mapFlavors.length - 1) {
        setCurrentSection(1);
      }
    } else if (currentSection === 1 && direction === "up") {
      setCurrentSection(0);
    }
  }, [currentIndex, currentSection, isAnimating]);

  useEffect(() => {
    window.addEventListener("wheel", handleScroll, { passive: false });
    return () => window.removeEventListener("wheel", handleScroll);
  }, [handleScroll]);

  const startAnimation = (callback) => {
    setIsAnimating(true);
    setTimeout(() => {
      callback();
      setIsAnimating(false);
    }, 500);
  };

  return (
    <div>
      <section
        className={`section array-section ${currentSection === 0 ? "show" : ""}`}
        style={{ backgroundColor: mapFlavors[currentIndex]?.backgroundColor }}
      >
        {mapFlavors[currentIndex] && (
          <>
            <div className={`SectionContainer textLeft
            ${isAnimating && currentIndex === mapFlavors.length - 2 && direction === "down" ? "slide-out-up" : ""}
            ${isAnimating && currentIndex === mapFlavors.length - 1 && direction === "up" ? "slide-out-down" : ""}
            ${currentIndex === mapFlavors.length - 2 && direction === "up" ? "slide-in-down" : ""}
            ${currentIndex === mapFlavors.length - 1 && direction === "down" ? "slide-in-up" : ""}
            `}>
              <h2 className="slide-in-left">{mapFlavors[currentIndex].name}</h2>
              <p className="slide-in-left">{mapFlavors[currentIndex].flavorDescription}</p>
            </div>

            <div className="SectionImageFruitContainer">
              <img id="flavorBanner"
                src={mapFlavors[currentIndex].fruit}
                alt="Flavor fruit"
                className={`fade-in ${isAnimating ? "fade-out" : ""}`}
              />
            </div>

            <div className="SectionImageContainer">
              <img 
                src={mapFlavors[currentIndex].fruitCan}
                alt="Flavor can"
              />
            </div>

            <div className={`SectionContainer textLeft
              ${isAnimating && currentIndex === mapFlavors.length - 2 && direction === "down" ? "slide-out-up" : ""}
              ${isAnimating && currentIndex === mapFlavors.length - 1 && direction === "up" ? "slide-out-down" : ""}
              ${currentIndex === mapFlavors.length - 2 && direction === "up" ? "slide-in-down" : ""}
              ${currentIndex === mapFlavors.length - 1 && direction === "down" ? "slide-in-up" : ""}
            `}>
              {mapFlavors[currentIndex].ingredients.map((ingredient, index) => (
                <p
                  key={index}
                  className={`slide-in-right ingredient-delay-${index + 1}`}
                >
                  {ingredient}
                </p>
              ))}
            </div>
          </>
        )}
      </section>

      <section className={`section next-section ${currentSection === 1 ? "show" : ""}`}
      style={{ backgroundColor: mapFlavors[currentIndex]?.backgroundColor }}>
        <h1>Nächste Sektion</h1>
      </section>
    </div>
  );
};

export default Home;
