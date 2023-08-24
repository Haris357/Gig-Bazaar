/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, { useState,useEffect } from 'react';
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
    job:"",skills:"",description:"",createdOn:currentDateTime,createdBy:userid
  });

  useEffect(() => {
    setjobp((prevJobp) => ({
      ...prevJobp,
      createdBy: userData.firstname,
    }));
  }, [userData]);

  const handleSubmit = async (e) => {
    debugger
    console.log(jobp);
    setLoading(true);
    e.preventDefault();
    const { job, skills, description, createdOn, createdBy } = jobp;
    const res = await fetch("/jobposting", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
       job, skills, description, createdOn, createdBy
      })
    });
  
    const data = await res.json();
    console.log(jobp);
    if (data.status === 422 || !data) {
      toast.error('Something went wrong');
    } else {
      setJobPostings(prevJobPostings => [...prevJobPostings, {
        skills, description, createdBy
      }]);
      toast.success('Job Posted Successfully');
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


  const [likeAnimation, setLikeAnimation] = useState(false);
  const [dislikeAnimation, setDislikeAnimation] = useState(false);

  return (
    <>
    <Grid container spacing={0}>
      {userData.designation === 'Client' &&(
        <Grid item xs={12}>
        <Container maxWidth='lg' className='p-3'>
        <div className='shadow-lg p-3  bg bg-white rounded'>
            <div className='row'>
            <div className='col'>
                <Grid container spacing={3}>
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
        <Grid item xs={12}>
        <Container maxWidth="md" className="p-5">
          <Paper elevation={0} square sx={{ p: 5 }}>
            <List>
              {jobPostings.map((job, index) => (
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
                >
                  {/* Like Button */}
                  <IconButton
                    aria-label="like"
                    color="primary"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      right: 40,
                      '&:hover': {
                        transform: 'scale(1.2)',
                      },
                    }}
                  >
                    <ThumbUpIcon />
                  </IconButton>
                  {/* Dislike Button */}
                  <IconButton
                    aria-label="dislike"
                    color="primary"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      '&:hover': {
                        transform: 'scale(1.2)',
                      },
                    }}
                  >
                    <ThumbDownIcon />
                  </IconButton>
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
        </Container>

      </Grid>
    </Grid>
  <ToastContainer/>
    </>
  );
};

export default JobPosting;