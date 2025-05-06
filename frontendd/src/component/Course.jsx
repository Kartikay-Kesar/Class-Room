import React from 'react'

const Course = () => {
  return (
    <div>
         <div className="courses-area section-padding40 fix">
  <div className="container">
    <div className="row justify-content-center">
      <div className="col-xl-7 col-lg-8">
        <div className="section-tittle text-center mb-55">
          <h2>Our featured courses</h2>
        </div>
      </div>
    </div>

    {/* Horizontal scroll container */}
    <div
      className="courses-actives"
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        overflowX: "auto",
        gap: "20px",
        scrollBehavior: "smooth",
        paddingBottom: "20px",
      }}
    >
      {/* Course Card */}
      {[1, 2, 3, 4].map((index) => (
        <div
          className="properties pb-20"
          key={index}
          style={{ minWidth: "300px", flex: "0 0 auto" }}
        >
          <div className="properties__card">
            <div className="properties__img overlay1">
              <a href="#">
                <img
                  src={`assets/img/gallery/featured${index > 3 ? 2 : index}.png`}
                  alt=""
                />
              </a>
            </div>
            <div className="properties__caption">
              <p>User Experience</p>
              <h3>
                <a href="#">Fundamental of UX for Application design</a>
              </h3>
              <p>
                The automated process all your website tasks. Discover tools and
                techniques to engage effectively with vulnerable children and
                young people.
              </p>
              <div className="properties__footer d-flex justify-content-between align-items-center">
                <div className="restaurant-name">
                  <div className="rating">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star-half"></i>
                  </div>
                  <p>
                    <span>(4.5)</span> based on 120
                  </p>
                </div>
                <div className="price">
                  <span>$135</span>
                </div>
              </div>
              <a href="#" className="border-btn border-btn2">
                Find out more
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
    </div>
  )
}

export default Course