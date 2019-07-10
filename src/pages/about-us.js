import React from 'react';
import './AboutUs.css';

import { Link } from 'gatsby';
import Layout from '../components/layout';

import Carousel from '../components/Carousel';

// import aboutImg from '../images/about_img.jpg';

//import aboutCompanyImg from '../images/pagu.jpg';

import whitlockOwner from '../images/whitlock_owner.jpg';
import TestimonialSlider from '../components/Testimonial/TestimonialSlider';
import Helmet from 'react-helmet';
import SEO from '../components/seo';

export default class AboutUs extends React.Component {
	render() {
		const testimonials = [
			{
				text: `"When it came time to rejuvenate one of our flagship stores we were fortunate to find Whitlock Architects.  Bill and his team, under the guidance of "the concept works, don't screw it up" dove in and created an evolved space that drove sales and elicited tremendously positive comments from our guests. From that project, Whitlock Architects has been involved in multiple design initiatives with us, from pubs to fine dining, exercising a refreshing ability to listen to our operating team and apply their creative passion, reflecting changing times and trends, while staying in budget and on time."`,
				// Bill and his team, under the guidance of "the concept works, don't screw it up" dove in and created an evolved space that drove sales and elicited tremendously positive comments from our guests.
				authorName: 'Tom Shea, Chief Operating Officer | The Briar Group'
			},
			{
				text: `“BLW Engineers, Inc. has had the pleasure of working with Whitlock Architects for numerous projects over the past several years; the relationship has developed into a true “team” for the many projects that we have collaborated on.  Whitlock Architects has extensive restaurant experience, expertise, and their unfailing attention to detail has resulted in the development of some of the finest restaurants throughout the area.  In addition, Whitlock Architects’ commitment to the coordination between the engineering disciplines and architecture has been a key component to the success of our projects.
BLW Engineers always looks forward to our next project with Bill and his staff.”`,
				// In addition, Whitlock Architects’ commitment to the coordination between the engineering disciplines and architecture has been a key component to the success of our projects. BLW Engineers always looks forward to our next project with Bill and his staff.
				authorName: 'Ken Beck, PE, LEED AP, Principal | BLW Engineers, Inc.'
			},
			{
				text: `“Our approach to every construction project is to build a strong team relationship based on thoughtful collaboration and clear communication.  This is especially important in our restaurant work.  Quick schedules, high levels of detail and the challenges of tight budgets require a team approach to be successful.  We have worked on many projects with Whitlock Architects over the past 8 years and we have always enjoyed a collaborative relationship where ideas can be shared and problems can be solved while maintaining our clients’ goals for their project.  It is exciting to work together for a great result and we have had many great results working with Whitlock Architects.”`,
				authorName: 'Derek Pelletier, President | Delta Design & Construction, Inc.'
			},
			{
				text: `“We engaged Whitlock Design to help re-brand our Chateau Restaurant and to create a new brand called Jake n Joe’s Sports Grille.  Bill and his staff did a terrific job in understanding how our concepts operate and how we could improve efficiencies and our customers’ experience.  Our family has operated the Chateau Restaurants since 1933 but we needed fresh ideas and a new aesthetic to maintain our strength in a very competitive environment.  Their client service and attention to detail makes us look forward to each new project with excitement.  Whitlock Architects has helped to broaden our demographic and grow into new markets.  They understand what we do inside and out and make our vision for a dining experience a reality.”`,
				authorName: 'Joseph Nocera, President | The Chateau Restaurants'
			},
			{
				text: `“Whitlock Design Group has helped us intelligently grow our business through their dedicated transformation of our brand look and feel into a cost-effective, operational reality that is highly resonant with our guests. The Whitlock team's thoughtful approach and open-minded dialogue with our management has allowed them to capture the essence of the Kings experience and weave those critical elements into a vivid total fabric that is social entertainment personified. As Kings is programmatically complex, this is no easy task, but Bill and his talented colleagues have built a scalable foundation that will allow us to proceed successfully into the future;  creating memorable spaces in all of our venues. Bowling has never been as hip - thanks to Whitlock Architects.”`,
				authorName: 'Frank Stryjewski, Chief Operating Officer | The Lyons Group'
			},
			{
				text: `“We have worked with Whitlock Design Group on multiple projects and for many years.  Bill and his team embrace the notion of working collaboratively to assist all clients with realizing their desired design/concept integrity while getting the best bang for their buck and ultimately maximizing their chances for success!”`,
				authorName: 'Ed McCabe, President | Cafco Construction Management'
			}
		];

		// const testimonials = [
		//   <div className="testimonial">
		//     <p>"When it came time to rejuvenate one of our flagship stores we were fortunate to find Whitlock Architects. Bill and his team, under the guidance of "the concept works, don't screw it up" dove in and created an evolved space that drove sales and elicited tremendously positive comments from our guests. From that project, Whitlock Architects has been involved in multiple design initiatives with us, from pubs to fine dining, exercising a refreshing ability to listen to our operating team and apply their creative passion, reflecting changing times and trends, while staying in budget and on time."</p>
		//     <p>- Tom Shea</p>
		//   </div>,
		//   <div className="testimonial">
		//     <p>"BLW Engineers, Inc. has had the pleasure of working with Whitlock Architects for numerous projects over the past several years; the relationship has developed into a true “team” for the many projects that we have collaborated on. Whitlock Architects has extensive restaurant experience, expertise, and their unfailing attention to detail has resulted in the development of some of the finest restaurants throughout the area. In addition, Whitlock Architects’ commitment to the coordination between the engineering disciplines and architecture has been a key component to the success of our projects. BLW Engineers always looks forward to our next project with Bill and his staff.”</p>
		//     <p>- Ken Beck</p>
		//   </div>
		// ]

		return (
			<Layout className="about-us-wrapper">
				<SEO
					title={`About Us|Architect|Restaurant Designer|Boston,MA`}
					description={`Whitlock Design Group, boston based restaurant and interior design with retail, restaurants and interiors Boston, whitlock design group, interior and restaurant designer boston, restaurant design boston. ${Math.random()}`}
				/>
				<Helmet>
			        <link rel="canonical" href="/about-us" />
			    </Helmet>
				<div id="about-us">
					<div id="about-us__content-wrapper" />

					<div className="about-company">
						<div className="about-company__wrapper">
							<h1 id="about-us__head-text">Who we are</h1>
							<p id="about-us__para">
								<p>
									Whitlock Design Group is a leader in restaurant and hospitality design with an
									extensive portfolio of dynamic and innovative retail, restaurant and entertainment
									venues. Whitlock Design Group has created award-winning designs and has been
									published in magazines, newspapers, television programs and across the web and
									social media.
								</p>

								<p>
									Our fresh and trend setting approach tells a unique story in each project, through
									cutting edge architecture and interior design concepts. We create memorable
									atmospheres with unique materials, innovative lighting, colors and textures. And we
									listen…and are excited to work with the unique passions, talents and ideas of the
									clients we serve, to ensure that visions become realities.
								</p>
							</p>
						</div>
					</div>

					<div className="about-owner">
						<div className="about-whitlock__owner">
							<h4 id="about-whitlock__owner__head-text">Bill Whitlock, AIA / NCARB</h4>
							<div className="about-whitlock__owner__para">
								<p>
									Bill is passionate about creating spaces that are both beautiful and functional. His
									designs are recognized for their creative uses of lighting and warmth of materials.
									His knowledge of how restaurants operate from the back of house to the customer
									experience informs the entire process. He is most proud of the success rate of his
									projects, noting that it takes discipline and wise decisions to succeed in his
									clients’ competitive environment. Bill has a reputation for building team
									relationships and problem solving. His involvement in restaurant and retail design
									has spanned three decades and he has created environments for countless amazing
									leaders in the restaurant industry.
								</p>
								<p>
									Bill graduated from Cornell University’s School of Architecture. He has been a
									frequent guest lecturer and design critic at the Cornell School of Hotel
									Administration and Endicott College’s Interior Design program. He is a registered
									architect in Massachusetts, New Hampshire, Illinois, North Carolina and Florida and
									is certified by the National Council of Architecture Registration Boards. Bill
									served as the New England representative to the American Institute of Architects
									Small Firm Round Table. He was chair of the Small Practice Network at the Boston
									Society of Architects for ten years.
								</p>

								<div className="about-whitlock__owner__para__quote_img">
									<span>
										Design “opportunities” often arise from obstacles and challenges. I love working
										with chefs and restaurateurs because they are incredibly talented and creative
										people themselves and the designs we often create as a team are some that I am
										most proud of.
										<p className="owner_name">- Bill Whitlock</p>
									</span>
									<img src={whitlockOwner} alt="whitlock owner" title="whitlock owner" />
								</div>
							</div>
						</div>
					</div>
				</div>

				<div id="testimonial-wrapper">
					<h2 className="testimonial-heading">Testimonials</h2>
					<h4 className="testimonial-secondary-heading">They love our work.</h4>
					<TestimonialSlider
						testimonials={testimonials}
						slideWaitTime={5000}
						testimonialStyle={{
							testimonialText: { fontSize: '1.2rem' },
							testimonialAuthorName: { fontSize: '1.2rem' }
						}}
					/>
				</div>
			</Layout>
		);
	}
}
