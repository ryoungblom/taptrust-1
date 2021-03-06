import React, { Component } from 'react';
import { Navbar, NavItem, Nav, Grid, Col, Row, ProgressBar, Glyphicon, Label } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from './Loading';

const Navigation = () => {
	return (
    	<div>
    		<Navbar fixedTop collapseOnSelect>
	        	<Navbar.Header>
		            <Navbar.Brand>
		            	<Link  to="/">
		            	<Glyphicon glyph="chevron-left" />Tokens
		            	</Link>
		       		</Navbar.Brand>    	
	          	</Navbar.Header>
	        </Navbar>
    	</div>
    )
}
class Profile extends Component {
	constructor(props) {
		super(props);

		this.state = {
			api: [],
			loading: true,
		};
	}

	componentDidMount(){
		const currentToken = this.props.match.params.name;
		const API = "http://localhost:8000/api/tokens/" + currentToken;
        axios.get(API)
	        .then(res => {
	        	const api = res.data;
	        	this.setState({ 
	        		api: api,
	        		loading: false,
	        	});
	        });
	       
    	}

    render() {
    		const token = this.state.api;
    		const reviews = token.Reviews || [ ];
    		const lastReview = reviews[reviews.length -1] || [ ];
    		const date = new Date(lastReview.createdAt);
			const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
            const lastReviewHTML = () => {return {__html: lastReview.review}};
            if (this.state.loading) {
                return <Loading />
            } else {
                 return (
                    <div>
                        <Navigation />
                        <Grid>
            				<Row>
            					<Col xs={10}><h2>{token.name}</h2></Col>
            				</Row>
            				<Row>
            					<Col xs={10}><p style={{ color: '#b19cd9', fontSize: "16px" }}>Category: {token.category}</p>
                                            <p style={{ color: '#b19cd9', marginTop: "-10px", fontSize: "16px" }}>age: {token.age}</p>
                                </Col>
            				</Row>
            				<Row>
            					<Col xs={10}><p>{token.description}</p></Col>
            				</Row>
            				<hr></hr>
            				<Row>
            					<Col xs={8} className="inline">
            						<div>
            							<h2 className='inline' style={{ fontWeight: 'bold' }}>{token.score_overall} </h2>
            							<p className='inline' style={{ color: 'grey', fontWeight:"bold" }}>/100 overall score</p>
            						</div>
            					</Col>
            					<Col xs={4} className="inline">
            						{(token.score_overall > 50) ?
        	                    		<p style={{ fontSize: "16px" }}><Label className="trusted">
                                                <Glyphicon glyph="ok-circle" /> Trusted
                                            </Label></p> : 
                                        <p style={{ fontSize: "16px" }}><Label className="not-trusted">
                                                <Glyphicon glyph="remove-circle" /> Not Trusted
                                            </Label></p>
        	                    	}
            					</Col>
            				</Row>
            				<Row>
            					<Col xs={12}>
            						<p style={{ fontWeight: "bold" }}>From {reviews.length} User Reviews</p>
            					</Col>
            				</Row>
            				<Row>
            					<Col xs={7}>
            						<ProgressBar bsStyle="warning" now={token.score_transparency} />
            					</Col>
            					<Col xs={5}>
            						<span className="text-nowrap inline"><p style={{ color: '#FFCC11' }}> Transparency: <b>{token.score_transparency}%</b></p></span>
            					</Col>
            				</Row>
            				<Row>
            					<Col xs={7}>
            						<ProgressBar bsStyle="warning" now={token.score_legal} />
            					</Col>
            					<Col xs={5}>
            						<span className="text-nowrap inline"><p style={{ color: '#FFCC11' }}> Legal Status: <b>{token.score_legal}%</b></p></span>
            					</Col>
            				</Row>
            				<Row>
            					<Col xs={7}>
            						<ProgressBar bsStyle="warning" now={token.score_functionality} />
            					</Col>
            					<Col xs={5}>
            						<span className="text-nowrap inline"><p style={{ color: '#FFCC11' }}> Functionality: <b>{token.score_functionality}%</b></p></span>
            					</Col>
            				</Row>
            				<Row>
            					<Col xs={7}>
            						<ProgressBar bsStyle="warning" now={token.score_governance} />
            					</Col>
            					<Col xs={5}>
            						<span className="text-nowrap inline"><p style={{ color: '#FFCC11' }}> Governance: <b>{token.score_governance}%</b></p></span>
            					</Col>
            				</Row>
            				<div className='review-div'>
            					<Row>
            						<Col xs={7}>
            							<p style={{ fontSize: '30px' }}>{lastReview.score_overall}</p>
            							<p style={{ color: 'grey' }}>Overall Score</p>
            						</Col>
            						<Col xs={5}>
            							<h4>{lastReview.name}</h4>
            							<p>{months[date.getMonth()]} {date.getDate()}, {date.getFullYear()}</p>
            						</Col>
            					</Row>
            					<Row>
            						<Col xs={3}>
            							<p>{lastReview.score_transparency}</p>
            							<p style={{ color: 'grey' }}>Transparency</p>
            						</Col>
            						<Col xs={3}>
            							<p>{lastReview.score_legal}</p>
            							<span className="text-nowrap"><p style={{ color: 'grey' }}>Legal Status</p></span>
            						</Col>
            						<Col xs={3}>
            							<p>{lastReview.score_functionality}</p>
            							<p style={{ color: 'grey' }}>Functionality</p>
            						</Col>
            						<Col xs={3}>
            							<p>{lastReview.score_governance}</p>
            							<p style={{ color: 'grey' }}>Governance</p>
            						</Col>
            					</Row>
            					<Row>
            						<Col xs={12}>
                                            {(lastReview.review.length > 250) ?
                                                <p style={{ color: 'grey' }}>{lastReview.review.substr(0,250) + "..."}</p> :
                                                <p style={{ color: 'grey' }}> {lastReview.review}</p>
                                            }   
            						</Col>
            					</Row>
            				</div>
        					<Row>
        						<Col xs={4} xsOffset={8}>
        							<Link 
        								style={{ color: 'grey', fontWeight: 'bold' }}
        								to={'/' + token.name + '/reviews'}>
        								See all {reviews.length} reviews
        							</Link>
        						</Col>
        					</Row>
        					<hr></hr>
        					<Row>
        						<Col xs={10}>
        							<h3 style={{ paddingBottom: '20px' }}>General Information</h3>
        						</Col>
        					</Row>
        					<Row>
        						<Col xs={6}>
        							<p style={{ color: 'grey' }}>Founder</p>
        						</Col>
        						<Col xs={6}>
        							<p>{token.founders}</p>
        						</Col>
        					</Row>
        					<hr></hr>
        					<Row>
        						<Col xs={6}>
        							<p style={{ color: 'grey' }}>Symbol</p>
        						</Col>
        						<Col xs={6}>
        							<p>{token.symbol}</p>
        						</Col>
        					</Row>
        					<hr></hr>
        					<Row>
        						<Col xs={6}>
        							<p style={{ color: 'grey' }}>Website</p>
        						</Col>
        						<Col xs={6}>
        							<a style={{ fontWeight: 'bold', color: 'gray' }} href={ "http://" + token.website }>{token.website}</a>
        						</Col>
        					</Row>
        				<hr></hr>
        			</Grid>	
            	</div>
            	)
  		}
   }
}

export default Profile