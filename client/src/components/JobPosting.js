/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, { useState,useEffect,useRef } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { TextField, TextareaAutosize } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Autocomplete from '@mui/material/Autocomplete';
import { Paper, List, ListItem, ListItemText,IconButton } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { formatDistanceToNow } from 'date-fns';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import {Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import Web3 from 'web3';


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
  const [userData,setUserData] = useState({});

  const UserCall = async ()=>{
    try {
      const res = await fetch('/about',{
        method:"GET",
        headers: {
          Accept:"application/json",
          "Content-Type":"application/json"
        },
        credentials:"include"
      });
      const data = await res.json();
      setUserData(data);
      if(res.status !== 200){
        const error = new Error(res.error);
        throw error;
      }
      
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    UserCall();
  },[])

  
  const userid = userData.firstname;
  const [jobp,setjobp] = useState({
    job:"",skills:"",description:"",createdOn:currentDateTime,createdBy:userid,title:"",expertise:"",pricing:null
  });

  useEffect(() => {
    setjobp((prevJobp) => ({
      ...prevJobp,
      createdBy: userData.firstname,
    }));
  }, [userData]);

  const handleSubmit = async (e) => {
    debugger;
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
    debugger;
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
  

  return (
    <>
    <Grid container spacing={0}>
      {userData.designation === 'Client' &&(
        <Grid item xs={11}>
        <Container maxWidth='lg' className='p-3'>
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
                  <Grid item xs={6} >
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
                  <Grid item xs={3}>
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
                  </Grid>
                  <Grid item xs={3}>
                    {selectedFile && <p>Attached File: {selectedFile.name}</p>}
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
        <Grid item xs={8}>
        <Container maxWidth="md" className="p-5">
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
        <Dialog open={openModal} onClose={handleCloseModal} maxWidth="md" fullWidth>
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
      </Dialog>
        </Container>
      </Grid>
    </Grid>
  <ToastContainer/>
    </>
  );
};

export default JobPosting;