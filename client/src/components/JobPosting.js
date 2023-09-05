/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, { useState,useEffect,useRef } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { TextField, TextareaAutosize, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Autocomplete from '@mui/material/Autocomplete';
import { Paper, List, ListItem, ListItemText,IconButton } from '@mui/material';
import { formatDistanceToNow } from 'date-fns';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import {Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Divider,Tab,Tabs } from '@mui/material';
import Web3 from 'web3';
import CheckIcon from '@mui/icons-material/Check';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import FlagIcon from '@mui/icons-material/Flag';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EthereumIcon from '@mui/icons-material/MonetizationOn';
import WorkIcon from '@mui/icons-material/Psychology';
import logo from '../img/ethereumwallet.png'

const JobPosting = () => {

  const jobSkills = {
        "Writing & Content": [
            "Blog Writing",
            "Copywriting",
            "Technical Writing",
            "Creative Writing",
            "Editing",
            "Proofreading",
            "Article Writing",
            "SEO Writing",
            "Press Release Writing",
            "Ghostwriting",
            "Social Media Content Creation",
            "Scriptwriting"
          ],   
          "Graphic Design & Multimedia": [
            "Logo Design",
            "Web Design",
            "Illustration",
            "Animation",
            "Video Editing",
            "Motion Graphics",
            "UI/UX Design",
            "Brochure Design",
            "Poster Design",
            "Infographic Design",
            "3D Modeling",
            "Photography"
          ],
          "Programming & Development": [
            "Web Development",
            "Mobile App Development",
            "Software Development",
            "Front-End Development",
            "Back-End Development",
            "Full Stack Development",
            "Game Development",
            "E-commerce Development",
            "WordPress Development",
            "Python Programming",
            "Java Programming",
            "Database Management"
          ],     
          "Digital Marketing": [
            "SEO (Search Engine Optimization)",
            "Social Media Marketing",
            "Content Marketing",
            "Email Marketing",
            "PPC (Pay-Per-Click) Advertising",
            "Social Media Advertising",
            "Digital Strategy Planning",
            "Influencer Marketing",
            "Online Branding",
            "Google Ads",
            "Analytics and Data Analysis"
          ],    
          "Administrative Support": [
            "Virtual Assistance",
            "Data Entry",
            "Transcription",
            "Customer Service",
            "Project Management",
            "Market Research",
            "Calendar Management",
            "Email Handling",
            "Travel Planning",
            "Appointment Scheduling",
            "Document Preparation"
          ],     
          "Translation & Languages": [
            "Translation Services",
            "Language Tutoring",
            "Interpretation",
            "Transcription",
            "Localization",
            "Proofreading and Editing",
            "Language Teaching",
            "Subtitling",
            "Voiceover Services",
            "Multilingual Content Creation"
          ],     
          "Sales & Marketing": [
            "Lead Generation",
            "Telemarketing",
            "Cold Calling",
            "Market Research",
            "Sales Strategy Development",
            "CRM Management",
            "Business Development",
            "Sales Funnel Optimization",
            "B2B Sales",
            "Customer Relationship Management"
          ],    
          "Engineering & Architecture": [
            "CAD (Computer-Aided Design)",
            "Mechanical Engineering",
            "Civil Engineering",
            "Architectural Design",
            "Structural Engineering",
            "3D Modeling and Rendering",
            "Industrial Design",
            "Product Design",
            "Electrical Engineering",
            "Sustainable Design"
          ],     
          "Legal Services": [
            "Contract Drafting",
            "Legal Research",
            "Paralegal Services",
            "Intellectual Property Law",
            "Contract Law",
            "Employment Law",
            "Corporate Law",
            "Legal Consulting",
            "Regulatory Compliance",
            "Privacy and Data Protection"
          ],     
          "Finance & Accounting": [
            "Bookkeeping",
            "Financial Analysis",
            "Tax Preparation",
            "Auditing",
            "Budgeting",
            "Financial Planning",
            "Payroll Management",
            "QuickBooks",
            "Financial Reporting",
            "Investment Analysis"
          ],     
          "Data Science & Analytics": [
            "Data Entry",
            "Data Analysis",
            "Data Visualization",
            "Statistical Analysis",
            "Machine Learning",
            "Data Mining",
            "Business Intelligence",
            "Predictive Modeling",
            "Data Cleaning",
            "A/B Testing"
          ],     
          "Video & Animation": [
            "Video Production",
            "Animation",
            "Video Editing",
            "Motion Graphics",
            "Visual Effects",
            "Explainer Videos",
            "Whiteboard Animation",
            "3D Animation",
            "Character Design",
            "Storyboarding"
          ],     
          "Music & Audio": [
            "Music Composition",
            "Audio Editing",
            "Sound Design",
            "Voiceover Services",
            "Jingle Creation",
            "Podcast Editing",
            "Mixing and Mastering",
            "Background Music",
            "Foley Artistry",
            "Music Production"
          ],     
          "Consulting & Coaching": [
            "Business Consulting",
            "Career Coaching",
            "Life Coaching",
            "Executive Coaching",
            "Leadership Development",
            "Personal Development Coaching",
            "Health and Wellness Coaching",
            "Relationship Coaching",
            "Financial Coaching",
            "Performance Coaching"
          ],      
          "Healthcare & Wellness": [
            "Nutrition Coaching",
            "Fitness Training",
            "Mental Health Counseling",
            "Holistic Healing",
            "Health Consultation",
            "Wellness Coaching",
            "Yoga Instruction",
            "Meditation Coaching",
            "Stress Management",
            "Personal Training"
          ]
        
    };

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [userData,setUserData] = useState([]);
  

  const UserCall = async () => {
    try {
      const res = await fetch('/about', {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });
      const data = await res.json();
      setUserData(data);
      if (res.status !== 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  
  useEffect(() => {
    UserCall();
  },[])

  const userid = userData.firstname;
  const [jobp,setjobp] = useState({
    job:"",skills:"",description:"",createdOn:currentDateTime,createdBy:userid,title:"",expertise:"",pricing:null,flexibility:"",estimatedtime:""
  });

  useEffect(() => {
    setjobp((prevJobp) => ({
      ...prevJobp,
      createdBy: userData.firstname,
    }));
  }, [userData]);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('job', jobp.job);
    formData.append('skills', jobp.skills);
    formData.append('description', jobp.description);
    formData.append('createdOn', jobp.createdOn);
    formData.append('createdBy', jobp.createdBy);
    formData.append('title', jobp.title);
    formData.append('expertise', jobp.expertise);
    formData.append('pricing', jobp.pricing);
    formData.append('flexibility', jobp.flexibility);
    formData.append('estimatedtime',jobp.estimatedtime);

  
    try {
      const res = await fetch("/jobposting", {
        method: "POST",
        body: formData,
      });
  
      const data = await res.json();
  
      if (data.error) {
        toast.error(data.error);
      } else {
        setJobPostings([...jobPostings, jobp]);
        toast.success('Job Posted Successfully');
      }
    } catch (error) {
      console.error('Error posting job:', error);
      toast.error('Error posting job');
    }
  
    setLoading(false);
  };
  
  

  const [jobPostings, setJobPostings] = useState([]);

  const fetchJobPostings = async () => {
    try {
      const res = await fetch('/jobpostings', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });
  
      const data = await res.json();
      if (res.status !== 200) {
        const error = new Error(data.error);
        throw error;
      }
  
      setJobPostings(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchJobPostings();
  }, []);

  const handleInputs = (event) => {
    const { name, value } = event.target;
    setjobp((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleAutocompleteChange = (_, newValue) => {
    handleInputs({ target: { name: 'expertise', value: newValue } });
  };

  const handleAutocompleteChangeflex = (_, newValue) => {
    handleInputs({ target: { name: 'flexibility', value: newValue } });
  };

  const handleAutocompleteChangeest = (_,newValue) => {
    handleInputs({target: {name:"estimatedtime",value:newValue}});
  }

  const [searchTerm, setSearchTerm] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const handleOpenModal = (job) => {
    setSelectedJob(job);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const filteredJobPostings = jobPostings.filter((job) =>
  job.job && job.job.toLowerCase().includes(searchTerm.toLowerCase())
);

const [ethValue, setEthValue] = useState('');
  const [ethToUsdRate, setEthToUsdRate] = useState(null);

  const handleEthChange = (event) => {
    const input = event.target.value;

    if (/^\d*\.?\d*$/.test(input)) {
      setEthValue(input);
    }
  };

  const fetchEthereumPrice = async () => {
    try {
      const web3 = new Web3('https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID');
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
      const data = await response.json();
      const ethPriceInUSD = data.ethereum.usd;
      setEthToUsdRate(ethPriceInUSD);
    } catch (error) {
      console.error('Error fetching Ethereum price:', error);
    }
  };

  useEffect(() => {
    fetchEthereumPrice();
  }, []);

  const calculateUsdValue = () => {
    const ethAmount = parseFloat(ethValue);
    if (!isNaN(ethAmount) && ethToUsdRate !== null) {
      return (ethAmount * ethToUsdRate).toFixed(2);
    }
    return '';
  };
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };
  
  const OnProfile = () => {
    navigate('/UserProfile');
  }

  const [openDialog, setOpenDialog] = useState(false);
  const [activeTab, setActiveTab] = useState(0);  

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  

  return (
    <>
    <Grid container spacing={0}>
      {userData.designation === 'Client' &&(
        <Grid item xs={12}>
        <Container maxWidth='xl' className='p-5'>
        <div className='shadow-lg p-3  bg bg-white rounded'>
            <div className='row'>
              <div className='col'>
                <Grid container spacing={3}>
                  <Grid item xs={6} >
                    <TextField variant='outlined' name='title' onChange={handleInputs} value={jobp.title} fullWidth size='small' label='Job Title' />
                  </Grid>
                  <Grid item xs={6} >
                  <Autocomplete
                    size='small' 
                    options={[
                      "Beginner",
                      "Intermediate",
                      "Expert"
                    ]}
                    renderInput={(params) => <TextField {...params} label="Select Expertise" />}
                    name="expertise"
                    value={jobp.expertise || null}
                    onChange={handleAutocompleteChange}
                  />
                  </Grid>
                  <Grid item xs={6}>
                    <Autocomplete
                      size='small'
                      options={[
                        "Writing & Content",
                        "Graphic Design & Multimedia",
                        "Programming & Development",
                        "Digital Marketing",
                        "Administrative Support",
                        "Translation & Languages",
                        "Sales & Marketing",
                        "Engineering & Architecture",
                        "Legal Services",
                        "Finance & Accounting",
                        "Data Science & Analytics",
                        "Video & Animation",
                        "Music & Audio",
                        "Consulting & Coaching",
                        "Healthcare & Wellness"
                      ]}
                      renderInput={(params) => <TextField {...params} label="Select Job" />}
                      value={jobp.job || null}
                      onChange={(event, value) => {
                        if (value) {
                          setjobp((prevJobp) => ({
                            ...prevJobp,
                            job: value,
                            skills: null,
                          }));
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    {jobp.job && (
                      <Autocomplete
                        size='small'
                        options={jobSkills[jobp.job] || []}
                        renderInput={(params) => <TextField {...params} label='Skills' variant='outlined' />}
                        value={jobp.skills || null}
                        onChange={(event, value) => {
                          setjobp((prevJobp) => ({
                            ...prevJobp,
                            skills: value,
                          }));
                        }}
                        disabled={!jobp.job}
                      />
                    )}
                  </Grid>
                  <Grid item xs={12}>
                      <TextareaAutosize
                      placeholder='Description'
                      style={{
                          width: '100%',
                          padding: '0.5rem',
                          fontSize: '1rem',
                          borderRadius: '4px',
                          
                      }}
                      value={jobp.description} name='description' onChange={handleInputs}
                      />
                  </Grid>
                  <Grid item xs={4} >
                  <div>
                      <TextField
                        label="Pricing"
                        size='small'
                        fullWidth
                        value={ethValue && jobp.pricing}
                        name="pricing"
                        onChange={(event) => {
                          handleEthChange(event);
                          handleInputs(event);
                        }}
                        InputProps={{
                          inputProps: {
                            pattern: /^\d*\.?\d*$/,
                          },
                        }}
                      />
                      <div>
                        {ethValue && ethToUsdRate !== null && (
                          <p>
                            {ethValue} Ethereum is approximately ${calculateUsdValue()} USD
                          </p>
                        )}
                      </div>
                    </div>
                  </Grid>
                  <Grid item xs={4} >
                    <Autocomplete
                    size='small'
                    options={[
                      "Fixed Price",
                      "Negotiable"
                    ]}
                    renderInput={(params) => <TextField {...params} label="Price Flexibility" />}
                    name="flexibility"
                    value={jobp.flexibility || null}
                    onChange={handleAutocompleteChangeflex}
                    />
                  </Grid>
                  <Grid item xs={4} >
                  <Autocomplete
                  size='small'
                  options={[
                    "3 Hours",
                    "6 Hours",
                    "12 Hours",
                    "1 Day",
                    "3 Day",
                    "1 Week",
                    "1 Month",
                    "3 Months",
                    "6 Months",
                  ]}
                  renderInput={(params) => <TextField {...params} label="Estimated Time" />}
                  name="estimatedtime"
                  value={jobp.estimatedtime || null}
                  onChange={handleAutocompleteChangeest}
                  />
                  </Grid>
                  <Grid item xs={4}>
                    <input
                      type="file"
                      accept=".png,.pdf,.doc,.docx"
                      onChange={handleFileChange}
                      style={{ visibility: 'hidden', width: '1px' }}
                      ref={fileInputRef}
                    />
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => fileInputRef.current.click()}
                    >
                      Attach File
                    </Button>
                    {selectedFile && <p>Attached File: {selectedFile.name}</p>}
                  </Grid>
                  <Grid item xs={4}> 
                  </Grid>
                  <Grid item xs={12}>
                      <Button
                      variant="outlined"
                      color="primary"
                      onClick={handleSubmit}
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
                      disabled={loading}
                      >
                      {loading ? (
                          <CircularProgress size={20} style={{ position: 'absolute' }} />
                      ) : (
                          <SendIcon style={{ marginRight: '0.5rem' }} />
                      )}
                      {loading ? 'Posting...' : 'Post'}
                      </Button>
                  </Grid>
                  </Grid>
                </div>
              </div>
            </div>
        </Container>
        </Grid>
      )}
      <Grid container >

      </Grid>
      <Grid item xs={12} md={9}>
        <Container maxWidth="lg" className="p-5">
        <div className='shadow-lg p-3 mb-5 bg bg-white rounded' >
        <Paper elevation={0} square sx={{ p: 5 }}>
        <h4>Jobs you might like</h4>
        <br/>
        <TextField
            type="text"
            placeholder="Search jobs..."
            size='small'
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
            <List>
              {filteredJobPostings.map((job, index) => (
                <ListItem
                  key={index}
                  button
                  divider
                  sx={{
                    display: 'block',
                    marginBottom: '10px',
                    wordWrap: 'break-word',
                    position: 'relative',
                    '&:last-child': {
                      marginBottom: 0,
                    },
                  }}
                  onClick={() => handleOpenModal(job)}
                >
                  <ListItemText
                    primary={<strong>{job.job}</strong>}
                    secondary={job.skills}
                    primaryTypographyProps={{ variant: 'h6' }}
                    secondaryTypographyProps={{ variant: 'subtitle1' }}
                  />
                  <ListItemText
                    primary={job.description}
                    secondary={`Posted By: ${job.createdBy} ${formatDistanceToNow(new Date(job.createdOn), { addSuffix: true })}`}
                    primaryTypographyProps={{ variant: 'body1' }}
                    secondaryTypographyProps={{
                      variant: 'body2',
                      color: 'textSecondary',
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </div>
        {/* <Dialog open={openModal} onClose={handleCloseModal} maxWidth="lg" fullWidth>
        {selectedJob && (
          <>
            <DialogTitle>{selectedJob.job}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                {selectedJob.description}
                </DialogContentText>
                
                {selectedJob.attachment && (
                <>
                  <strong>Attachment:</strong>
                  <div>Filename: {selectedJob.attachment.filename}</div>
                  <div>Original Name: {selectedJob.attachment.originalname}</div>
                  <div>Mimetype: {selectedJob.attachment.mimetype}</div>
                  <a
                    href={`/path/to/attachment/${selectedJob.attachment.filename}`}
                    download
                  >
                    Download Attachment
                  </a>
                </>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseModal}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog> */}
          {userData.designation === 'Freelancer' && (
            <Dialog open={openModal} onClose={handleCloseModal} maxWidth="lg" fullWidth>
            {selectedJob && (
              <>
                {/* <DialogTitle>{selectedJob.job}</DialogTitle> */}
                <DialogContent>
                  <DialogContentText>
                    {/* Introduction or overview content can go here */}
                  </DialogContentText>
                  
                  <Grid container spacing={2}>
                    {/* Left Column */}
                    <Grid item xs={12} md={6}>
                      <section>
                        <h4>{selectedJob.title}</h4>
                        <br/>
                        <p>{selectedJob.job}</p>
                        <p>Posted: {formatDistanceToNow(new Date(selectedJob.createdOn), { addSuffix: true })}</p>
                      </section>
                      <Divider />
                      {/* Section 3: Description */}
                      <section>
                        <p>{selectedJob.description}</p>
                      </section>
                      <Divider />

                      {/* Section 5: Job Link */}
                      <section>
                        <h2>Job Link</h2>
                        <p>Provide a link to the job posting or related resources.</p>
                      </section>
                      <Divider />

                      {/* Section 7: Project Type */}
                      <section>
                        <h2>Project Type</h2>
                        <p>Describe the type of project or work involved.</p>
                      </section>
                      <Divider />

                      {/* Section 9: Activity in This Job */}
                      <section>
                        <h2>Activity in This Job</h2>
                        <p>Discuss the ongoing tasks and activity related to the job.</p>
                      </section>
                      <Divider />

                    </Grid>

                    {/* Right Column */}
                    <Grid item xs={12} md={6}>
                      {/* Section 3: Apply Now */}
                      <section>
                        <Grid container spacing={1} textAlign="left">
                          <Grid item xs={12}>
                            <Button
                              variant="contained"
                              size="small"
                              color="success"
                              startIcon={<CheckIcon />}
                              onClick={() => setOpenDialog(true)}
                            >
                              Apply Now
                            </Button>
                          </Grid>
                          <Grid item xs={12}>
                            <Button variant='outlined' size='small' color='success' startIcon={<BookmarkIcon />}>
                              Save Job
                            </Button>
                          </Grid>
                          <Grid item xs={12}>
                            <Button size='small' color='success' startIcon={<FlagIcon />}>
                              Flag as Inappropriate
                            </Button>
                          </Grid>
                        </Grid>
                      </section>
                      <Divider />

                      {/* Section 4: About the Client */}
                      <section>
                        <p>Posted By: {selectedJob.createdBy}</p>
                      </section>
                      <Divider />

                      {/* Section 6: Flexibility */}
                      <section>
                        <h2>Flexibility</h2>
                        <p>Explain any flexibility options regarding the job.</p>
                      </section>
                      <Divider />

                      {/* Section 8: Skills and Expertise */}
                      <section>
                        <h2>Skills and Expertise</h2>
                        <p>List the required skills and expertise for the job.</p>
                      </section>
                      <Divider />

                      {/* Section 10: Client History */}
                      <section>
                        <h2>Client History</h2>
                        <p>Provide background information about the client's history.</p>
                      </section>
                      <Divider />

                      {/* Section 11: Similar Job */}
                      <section>
                        <h2>Similar Job</h2>
                        <p>Link or describe similar jobs for reference.</p>
                      </section>
                      <Divider />

                    </Grid>
                  </Grid>
                </DialogContent>
                <DialogActions>
                  <Button color='success' size='small'  onClick={handleCloseModal}>Close</Button>
                </DialogActions>
              </>
            )}
            </Dialog>
      )}
          <Dialog open={openDialog} maxWidth="lg" fullWidth>
            <DialogTitle>Apply for the Job</DialogTitle>
            <DialogContent>        
              <Tabs
                  value={activeTab}
                  onChange={handleTabChange}
                  sx={{
                    "& .Mui-selected": {
                      color: '#00C853 !important', 
                    },
                    "& .MuiTabs-indicator": {
                      backgroundColor: '#00C853 !important',
                    },
                  }}
                >
                <Tab label="Proposal Settings" />
                <Tab label="Job Details" />
                <Tab label="Additional Details" />
                <Tab label="Terms" />
              </Tabs>
              {/* Content for Proposal Settings Tab */}
              {activeTab === 0 && (         
                <Container maxWidth='lg' className='p-3'>
                  <div className='shadow-lg p-3 mb-5 bg-white rounded'>
                    <Grid container spacing={2} >
                      <Grid item xs={12}>
                          <h5>Profile Settings</h5>
                      </Grid>
                      <Grid item xs={12} md={4} >
                      {userData.UserProfileWork ? (
                        <Autocomplete
                          size='small'
                          options={userData.UserProfileWork.map(profile => profile.work)}
                          renderInput={(params) => <TextField {...params} label="Select Profile" />}
                          name="profileWork"
                        />
                      ) : (
                        null
                      )}
                      </Grid>
                      <Grid item xs={12} md={12} >
                        <p>This proposal requires <b>16 devCoins</b>.</p>
                        <p>When you submit this proposal, you'll have <b>96 Coins</b> remaining.</p>
                      </Grid>
                    </Grid>
                    
                  </div>
                </Container>
              )}

              {/* Content for Job Details Tab */}
              {activeTab === 1 && (
                <Container maxWidth='lg' className='p-3'>
                  <div className='shadow-lg p-3 mb-5 bg-white rounded'>
                      {selectedJob && (
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <h5>Job Details</h5>
                        </Grid>
                        <Grid item xs={7} md={7} style={{ borderRight: '1px solid #ccc' }}>
                          <h4>{selectedJob.title}</h4>
                          <p>{selectedJob.job} Posted On: {formatDistanceToNow(new Date(selectedJob.createdOn), { addSuffix: true })}</p>
                          <p>{selectedJob.description}</p>
                        </Grid>
                        <Grid item xs={5} md={5}>
                          <p>
                            <WorkIcon /> {selectedJob.expertise}, Experience Level
                          </p>
                          <p>
                            <EthereumIcon /> Ethereum: {selectedJob.pricing}
                          </p>
                          <p>
                            <AccessTimeIcon /> Time: {selectedJob.estimatedtime}
                          </p>
                        </Grid>
                        
                        <Grid item xs={12} md={12} style={{ borderTop: '1px solid #ccc' }} >
                          <p>
                            Skills & Expertise
                          </p>
                          <p>{selectedJob.skills}</p>
                        </Grid>
                      </Grid>
                      
                        )}
                  </div>
              </Container>
              )}

              {/* Content for Additional Details Tab */}
              {activeTab === 2 && (
                  <Container maxWidth='lg' className='p-3'>
                  <div className='shadow-lg p-3 mb-5 bg-white rounded'>
                    <Grid container spacing={2} >
                        <Grid item xs={12} >
                          <h5>Additional Details</h5>
                        </Grid>
                        <Grid item xs={12} md={12} >
                          <TextField variant='outlined' fullWidth size='small' label='Cover Letter' multiline rows={4}/>
                        </Grid>
                    </Grid>
                  </div>
                </Container>
              )}

              {/* Content for Terms Tab */}
              {activeTab === 3 && (
                <Container maxWidth='lg' className='p-3'>
                <div className='shadow-lg p-3 mb-5 bg-white rounded'>
                  <Grid container spacing={2}>
                    <Grid item xs={8} md={8}>
                      <h5>Terms</h5>
                      <h6>What is the rate you'd like to bid for this job?</h6>
                      <p>Your Profile Rate: </p>
                      {/* <p>Your Profile Rate: {userData.UserProfileWork(profile => profile.hourlyRate)}</p> */}
                      <p>Client’s budget: {selectedJob.pricing} eth </p>
                      <p>2% Freelancer Service Fee</p>
                      <p>{selectedJob.pricing * 0.02} eth /hr</p>
                      <p>You'll receive {selectedJob.pricing - (selectedJob.pricing * 0.02)} eth</p>
                      <Typography>The estimated amount you'll receive after service fees</Typography>
                    </Grid>
                    <Grid item xs={4} md={4} >
                      <img src={logo} width={250} alt="Logo" />
                    </Grid>
                  </Grid>
                </div>
              </Container>
              )}
            </DialogContent>
            <DialogActions>
              <Button variant='outlined' size='small' color='success' onClick={() => setOpenDialog(false)}>Cancel</Button>
              {activeTab > 0 && (
                <Button variant='outlined' size='small' color='success' onClick={() => setActiveTab(activeTab - 1)}>Back</Button>
              )}
              {activeTab < 3 && (
                <Button variant='outlined' size='small' color='success' onClick={() => setActiveTab(activeTab + 1)}>Next</Button>
              )}
              {activeTab === 3 && (
                <Button variant='contained' size='small' color='success' onClick={() => setActiveTab(activeTab + 1)}>Submit a Proposal</Button>
              )}
            </DialogActions>
          </Dialog>
        </Container>
      </Grid>
      <Grid item xs={12} md={3}>
      <Container maxWidth='sm' className='p-5'>
      <div className='shadow-lg p-3 mb-5 bg-white rounded'>
        <Avatar
          sx={{
            width: 100,
            height: 100,
            margin: '0 auto',
            marginBottom: '1rem',
            border: '2px solid #fff',
          }}
        >
          <PersonIcon fontSize='large' />
        </Avatar>
        <div style={{ textAlign: 'center' }}>
          <h4>{userData.firstname}</h4>
          <Button color='success' variant="contained" onClick={OnProfile}>Profile</Button>
        </div>
      </div>
    </Container>
      </Grid>   
    </Grid>
  <ToastContainer/>
    </>
  );
};

export default JobPosting;