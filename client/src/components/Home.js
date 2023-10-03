import React from 'react';
import { Button, Container, Divider, Fab, Grid, Typography } from '@mui/material';
// import eth from '../img/crypto-currency.png'
import staff from '../img/staff.png'
import job from '../img/job-offer.png'
import quality from '../img/standards.png'
import skills from '../img/organization-skills.png'
import support from '../img/service.png'
import secure from '../img/secure-payment.png'
import community from '../img/partners.png'
import rating from '../img/rating.png'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import AddIcon from '@mui/icons-material/AddCircle';
import SearchIcon from '@mui/icons-material/Pageview';
import SEarth from '@mui/icons-material/TravelExplore';
import PublicIcon from '@mui/icons-material/Public';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Home = () => {
  return (
    <>
     <Container maxWidth='xl' className='p-4' >
      {/* <div className='shadow-lg p-3 mb-5 bg-white rounded'>
        <Grid container spacing={1}>
          <Grid item xs={12} md={9}>
            <Typography variant='h4' color='green'><b>Join The Next-Gen Decentralized Talent Marketplace and Shape Your Future Career Today</b></Typography>
            <br />
            <Button
                variant="outlined"
                color="primary"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: 'scale(1)',
                    transition: 'all 0.3s ease-in-out',
                    position: 'relative',
                    borderColor: '#4CAF50',
                    color: '#4CAF50',
                }}
                onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#4CAF50';
                    e.currentTarget.style.transform = 'scale(1.1)';
                    e.currentTarget.style.color = '#ffffff';
                }}
                onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.color = '#4CAF50';
                }}
                >
                Join Now 
              </Button>
              <br />
            <Typography variant='h6' >
              <b>Explore a world of possibilities on Gig-Bazaar, where your skills and talents meet a global marketplace. Say goodbye to intermediaries and embrace a decentralized ecosystem that rewards your expertise. Join now and be part of the freelance revolution powered by blockchain technology.
              </b>
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <img src={eth} width='100%' alt='Logo' />
          </Grid>
        </Grid>
      </div> */}
      <div className='p-3 mb-5' >
      <div className='text-center title'>
          <Typography variant='h3' color='green'><b>Gig-Bazaar</b></Typography>
          <Typography variant='h5' color='green'><b>Unlock Your Gig-tential with Gig-Bazaar</b></Typography>
          <Typography variant='h6' color='green'><b>Where Freelancers Thrive and Clients Discover Talent in the Web3 Era!</b></Typography>
      </div>
      </div>
    </Container>
    <Container maxWidth='xl' className='p-4' >
      <div className='shadow-lg p-3 mb-5 bg-white rounded'>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <img src={staff} width='80%' alt='Logo' />
          </Grid>
          <Grid item xs={12} md={8} spacing={1} container>
            <Grid item xs={12} md ={12} >
              <Typography variant='h4' color='green'>
                <b>The best coworkers you've never encountered</b>
              </Typography>
            </Grid>
            <Grid item xs={12} md ={12} >
              <Typography>
                <b>Innovative logo artisans. Visionary app developers. Customer service aficionados. Expert marketing agencies. When you make the right connection, it can last a lifetime.</b>
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} spacing={1} container>
            <Grid item xs={12} md ={12} >
              <Fab size='small' color='secondary' variant='extended'>
                <ArrowRightAltIcon sx={{ mr: 1 }} /> Sales & Marketing
              </Fab>
            </Grid>
            <Grid item xs={12} md ={12} >
              <Fab size='small' color='secondary' variant='extended'>
                <ArrowRightAltIcon sx={{ mr: 1 }} /> Development & IT
              </Fab>
            </Grid>
            <Grid item xs={12} md ={12} >
              <Fab size='small' color='secondary' variant='extended'>
                <ArrowRightAltIcon sx={{ mr: 1 }} /> Writing & Translation
              </Fab>
            </Grid>
            <Grid item xs={12} md ={12} >
              <Fab size='small' color='secondary' variant='extended'>
                <ArrowRightAltIcon sx={{ mr: 1 }} /> Design & Creative
              </Fab>
            </Grid>
            <Grid item xs={12} md ={12} >
              <Fab size='small' color='secondary' variant='extended'>
                <ArrowRightAltIcon /> Find more
              </Fab>
            </Grid>
            </Grid>
            <Grid item xs={12} md={6} spacing={0} container>
            <Grid item xs={12} md={12}>
              <Container maxWidth='sm' className='p-2' sx={{
                transition: 'background-color 0.3s, transform 0.3s',
                '&:hover': { 
                  transform: 'scale(1.02)', 
                },
              }}>
                <div className='shadow-lg p-3 bg-white rounded'>
                  <AddIcon color='success' style={{ marginRight: '8px' }} /><span><b>Add Your Skill Now</b></span>
                </div>
              </Container>
            </Grid>
            <Grid item xs={12} md={12}>
              <Container maxWidth='sm' className='p-2' sx={{
                transition: 'background-color 0.3s, transform 0.3s',
                '&:hover': { 
                  transform: 'scale(1.02)', 
                },
              }}>
                <div className='shadow-lg p-3 bg-white rounded'>
                  <SearchIcon color='success' style={{ marginRight: '8px' }} /><span><b>Find Your Skill Now</b></span>
                </div>
              </Container>
            </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Container>
    <Container maxWidth='xl' className='p-4' >
      <div className='shadow-lg p-3 mb-5 bg-white rounded'>
        <Grid container spacing={1} >
          <Grid item xs={12} md={3} >
            <img src={job} width='100%' alt='Logo' />
          </Grid>
          <Grid item xs={12} md={6} >
              <Typography variant='h5' color='green' >
              <b>Seize the future today:</b>
              </Typography>
              <br/>
              <Typography>
                <b>
                With our end-to-end support, you can effortlessly post your job and unlock a flood of proposals.
               Once you discover your ideal expert, engage in conversations about timelines, availability,
               and pricing before taking the next step.
                </b>
              </Typography>
              <br/>
              <Divider/>
              <br/>
              <Button
                variant="outlined"
                color="primary"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: 'scale(1)',
                    transition: 'all 0.3s ease-in-out',
                    position: 'relative',
                    borderColor: '#4CAF50',
                    color: '#4CAF50',
                }}
                onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#4CAF50';
                    e.currentTarget.style.transform = 'scale(1.1)';
                    e.currentTarget.style.color = '#ffffff';
                }}
                onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.color = '#4CAF50';
                }}
                >
                Post a job 
              </Button>
          </Grid>
          <Grid item xs={12} md={3} >
            <Container
              maxWidth="lg"
              sx={{
                padding: '20px',
                borderRadius: '10px',
                transition: 'background-color 0.3s, transform 0.3s',
                '&:hover': {
                  transform: 'scale(1.02)', 
                },
              }}
            >
              <div className='shadow-lg p-3 bg-white rounded'>
              <SEarth color='success' style={{ marginRight: '8px' }} /><span>Look for a Job all over the world</span>
              </div>
              
            </Container>
            <Container
              maxWidth="lg"
              sx={{
                padding: '20px',
                borderRadius: '10px',
                transition: 'background-color 0.3s, transform 0.3s',
                '&:hover': {
                  transform: 'scale(1.02)', 
                },
              }}
            >
              <div className='shadow-lg p-3 bg-white rounded'>
              <PublicIcon color='success' style={{ marginRight: '8px' }} /><span>Explore Global Opportunities</span>
              </div>
              
            </Container>
            <Container
              maxWidth="lg"
              sx={{
                padding: '20px',
                borderRadius: '10px',
                transition: 'background-color 0.3s, transform 0.3s',
                '&:hover': {
                  transform: 'scale(1.02)', 
                },
              }}
            >
              <div className='shadow-lg p-3 bg-white rounded'>
              <LocalLibraryIcon color='success' style={{ marginRight: '8px' }} /><span>Learn more</span>
              </div>
            </Container>
          </Grid>
        </Grid>
      </div>
    </Container>
    <Container maxWidth='xl' className='p-4' >
      <div className='shadow-lg p-5 mb-5 bg-white rounded'>
      <Typography variant='h5' ><b>Here's What you'll get</b></Typography>
      <br/>
        <Grid container spacing={1} >
          <Grid item xs={12} md={3} >
            <img src={quality} width='50%' alt='Logo' />
          </Grid>
          <Grid item xs={12} md={9} >
            <Typography variant='h6' >
              <b>Uncover top-notch talent</b>
            </Typography>
            <br/>
            <div>
              <ul>
                <li>Post a job and watch proposals from talented individuals pour in.</li>
                <li>Review their verified work history and read their reviews.</li>
                <li>Reach out to 30 potential candidates with each job posting.</li>
                <li>Leverage advanced search filters now.</li>
              </ul>
            </div>
          </Grid>
        </Grid>
        <Divider/>
        <br/>
        <Grid container spacing={1} >
          <Grid item xs={12} md={3} >
            <img src={skills} width='40%' alt='Logo' />
          </Grid>
          <Grid item xs={12} md={9} >
            <Typography variant='h6' >
              <b>Structure your skills in the following manner</b>
            </Typography>
            <br/>
            <div>
              <ul>
                <li>Make adding and managing skills a breeze.</li>
                <li>Use tags to label and organize skills</li>
                <li>Categorize skills for quick selection</li>
                <li>Let users show their skill level for better matches</li>
              </ul>
            </div>
          </Grid>
        </Grid>
        <Divider/>
        <br/>
        <Grid container spacing={1} >
          <Grid item xs={12} md={3} >
            <img src={support} width='40%' alt='Logo' />
          </Grid>
          <Grid item xs={12} md={9} >
            <Typography variant='h6' >
              <b>Assistance and guidance for your account.</b>
            </Typography>
            <br/>
            <div>
              <ul>
                <li>Round-the-clock premium customer assistance.</li>
              </ul>
            </div>
          </Grid>
        </Grid>
        <Divider/>
        <br/>
        <Grid container spacing={1} >
          <Grid item xs={12} md={3} >
            <img src={secure} width='40%' alt='Logo' />
          </Grid>
          <Grid item xs={12} md={9} >
            <Typography variant='h6' >
              <b>Secure and hassle-free payment</b>
            </Typography>
            <br/>
            <div>
              <ul>
                <li>Blockchain's decentralization shields against single points of attack.</li>
                <li>Transactions are tamper-proof once recorded on the blockchain.</li>
                <li>Advanced encryption safeguards transaction data.</li>
                <li>Consensus mechanisms validate transactions, guarding against fraud.</li>
              </ul>
            </div>
          </Grid>
        </Grid>
        <Divider/>
      </div>
    </Container>
    <Container maxWidth='xl' className='p-4' >
      <div className='shadow-lg p-3 mb-5 bg-success rounded'>
        <Grid container spacing={0} >
        <Grid item xs={12} md={3} >
        <img src={community} width='100%' alt='Logo' />
        </Grid>
        <Grid item xs={12} md={9} >
        <Container
              maxWidth="xl"
              sx={{
                padding: '20px',
                borderRadius: '10px',
                transition: 'background-color 0.3s, transform 0.3s',
                '&:hover': {
                  transform: 'scale(1.02)', 
                },
              }}
            >
              <div className='shadow-lg p-3 bg-white rounded'>
                <Grid container spacing={1} >
                  <Grid item xs={12} md={9} >
                    <Typography variant='h4' color='green' ><b>Gig-Bazaar Community</b></Typography>
                    <Divider/>
                    <br/>
                    <Typography variant='h5' ><b>Fostering Connections in the World of Talent and Opportunity</b></Typography>
                    <br/>
                    <Typography><b>Welcome to Gig-Bazaar Community, the vibrant heart of our platform. Here, we bring together freelancers and clients to forge meaningful connections, share expertise, and explore opportunities. Whether you're a talented freelancer seeking your next project or a client looking for the perfect match, our community is your gateway to a world of possibilities. Join us in this dynamic space where recommendations thrive, creativity flourishes, and success knows no bounds. At Gig-Bazaar, we believe that together, we can achieve greatness.</b></Typography>
                  </Grid>
                  <Grid item xs={12} md={3} >
                    <img src={rating} width='100%' alt='Logo' />
                  </Grid>
                </Grid> 
              </div>
            </Container>
        </Grid>
        </Grid>
      </div>
    </Container>
    <Container maxWidth='xl' className='p-4' >
      <div className='shadow-lg p-3 mb-5 bg-black rounded text-white '>
      <Fab size="small" color="secondary" aria-label="add">
        <FacebookIcon/>
      </Fab>
      <Fab size="small" color="secondary" aria-label="add">
        <InstagramIcon/>
      </Fab>
      <Fab size="small" color="secondary" aria-label="add">
        <LinkedInIcon/>
      </Fab>
      </div>
    </Container>
    </>
  );
}

export default Home;