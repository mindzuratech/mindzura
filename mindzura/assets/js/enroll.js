document.addEventListener('DOMContentLoaded', function() {
    // Set minimum start date to today
    const startDateInput = document.getElementById('startDate');
    if (startDateInput) {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        const minDate = `${yyyy}-${mm}-${dd}`;
        startDateInput.min = minDate;
    }

    // Handle photo upload preview
    const photoInput = document.getElementById('photo');
    const photoPreview = document.getElementById('photoPreview');
    
    if (photoInput && photoPreview) {
        photoInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                if (file.size > 2 * 1024 * 1024) { // 2MB limit
                    alert('File size exceeds 2MB limit. Please choose a smaller file.');
                    photoInput.value = '';
                    return;
                }
                
                const reader = new FileReader();
                reader.onload = function(event) {
                    photoPreview.innerHTML = `<img src="${event.target.result}" alt="Preview">`;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Handle other qualification field
    const highestQualification = document.getElementById('highestQualification');
    const otherQualificationContainer = document.getElementById('otherQualificationContainer');
    
    if (highestQualification && otherQualificationContainer) {
        highestQualification.addEventListener('change', function() {
            if (this.value === 'other') {
                otherQualificationContainer.style.display = 'block';
                document.getElementById('otherQualification').setAttribute('required', '');
            } else {
                otherQualificationContainer.style.display = 'none';
                document.getElementById('otherQualification').removeAttribute('required');
            }
        });
    }

    // Handle certifications field
    const hasCertifications = document.querySelectorAll('input[name="hasCertifications"]');
    const certificationsContainer = document.getElementById('certificationsContainer');
    
    if (hasCertifications && certificationsContainer) {
        hasCertifications.forEach(radio => {
            radio.addEventListener('change', function() {
                if (this.value === 'yes' && this.checked) {
                    certificationsContainer.style.display = 'block';
                } else {
                    certificationsContainer.style.display = 'none';
                }
            });
        });
    }

    // Handle area of interest and course selection
    const interestSelect = document.getElementById('interest');
    const courseSelect = document.getElementById('course');
    const courseDetails = document.getElementById('courseDetails');
    const otherInterestContainer = document.getElementById('otherInterestContainer');
    
    if (interestSelect) {
        interestSelect.addEventListener('change', function() {
            // Handle other interest field
            if (this.value === 'other') {
                otherInterestContainer.style.display = 'block';
            } else {
                otherInterestContainer.style.display = 'none';
            }
            
            // Populate courses based on interest
            populateCourses(this.value);
        });
    }
    
    if (courseSelect) {
        courseSelect.addEventListener('change', function() {
            if (this.value) {
                showCourseDetails(this.value);
            } else {
                courseDetails.style.display = 'none';
            }
        });
    }

    // Course data
    const courses = {
        'web-development': [
            {
                id: 'web-101',
                title: 'Full Stack Web Development',
                duration: '12 Weeks',
                description: 'Master HTML, CSS, JavaScript, React, Node.js, and MongoDB to build complete web applications.',
                price: '$499'
            },
            {
                id: 'web-102',
                title: 'Frontend Development with React',
                duration: '8 Weeks',
                description: 'Learn modern frontend development using React, Redux, and modern JavaScript (ES6+).',
                price: '$349'
            },
            {
                id: 'web-103',
                title: 'Backend Development with Node.js',
                duration: '8 Weeks',
                description: 'Build robust backend systems using Node.js, Express, and MongoDB.',
                price: '$349'
            }
        ],
        'mobile-development': [
            {
                id: 'mobile-101',
                title: 'Cross-Platform Mobile Development with Flutter',
                duration: '10 Weeks',
                description: 'Learn Flutter framework to build iOS and Android apps with a single codebase.',
                price: '$449'
            },
            {
                id: 'mobile-102',
                title: 'React Native Mobile Development',
                duration: '10 Weeks',
                description: 'Build native mobile apps for iOS and Android using React Native.',
                price: '$449'
            }
        ],
        'ai-ml': [
            {
                id: 'ai-101',
                title: 'Artificial Intelligence & Machine Learning',
                duration: '16 Weeks',
                description: 'Dive into Python, TensorFlow, and neural networks to build intelligent systems.',
                price: '$799'
            },
            {
                id: 'ai-102',
                title: 'Deep Learning Specialization',
                duration: '12 Weeks',
                description: 'Advanced course covering deep learning architectures and applications.',
                price: '$699'
            }
        ],
        'data-science': [
            {
                id: 'ds-101',
                title: 'Data Science & Analytics',
                duration: '14 Weeks',
                description: 'Learn Python, Pandas, NumPy, and data visualization to extract insights from data.',
                price: '$649'
            },
            {
                id: 'ds-102',
                title: 'Big Data with Hadoop and Spark',
                duration: '12 Weeks',
                description: 'Process and analyze large datasets using Hadoop and Spark ecosystems.',
                price: '$599'
            }
        ],
        'cybersecurity': [
            {
                id: 'cs-101',
                title: 'Cybersecurity Fundamentals',
                duration: '10 Weeks',
                description: 'Learn the basics of cybersecurity, ethical hacking, and network security.',
                price: '$549'
            }
        ],
        'cloud-computing': [
            {
                id: 'cc-101',
                title: 'Cloud Computing with AWS',
                duration: '12 Weeks',
                description: 'Master Amazon Web Services and cloud architecture fundamentals.',
                price: '$599'
            }
        ]
    };

    function populateCourses(interest) {
        if (!courseSelect) return;
        
        // Clear existing options
        courseSelect.innerHTML = '<option value="" selected disabled>Select a Course</option>';
        
        // Add courses based on interest
        if (courses[interest]) {
            courses[interest].forEach(course => {
                const option = document.createElement('option');
                option.value = course.id;
                option.textContent = course.title;
                courseSelect.appendChild(option);
            });
        }
    }

    function showCourseDetails(courseId) {
        if (!courseDetails) return;
        
        // Find the selected course in all categories
        let selectedCourse = null;
        for (const category in courses) {
            const foundCourse = courses[category].find(c => c.id === courseId);
            if (foundCourse) {
                selectedCourse = foundCourse;
                break;
            }
        }
        
        if (selectedCourse) {
            document.getElementById('courseTitle').textContent = selectedCourse.title;
            document.getElementById('courseDuration').textContent = selectedCourse.duration;
            document.getElementById('courseDescription').textContent = selectedCourse.description;
            document.getElementById('coursePrice').textContent = selectedCourse.price;
            courseDetails.style.display = 'block';
        } else {
            courseDetails.style.display = 'none';
        }
    }

    // Handle other referral source
    const referralSelect = document.getElementById('referral');
    const otherReferralContainer = document.getElementById('otherReferralContainer');
    
    if (referralSelect && otherReferralContainer) {
        referralSelect.addEventListener('change', function() {
            if (this.value === 'other') {
                otherReferralContainer.style.display = 'block';
            } else {
                otherReferralContainer.style.display = 'none';
            }
        });
    }

    // Form step navigation
    const nextStepButtons = document.querySelectorAll('.next-step');
    const prevStepButtons = document.querySelectorAll('.prev-step');
    const formSteps = document.querySelectorAll('.form-step');
    const progressSteps = document.querySelectorAll('.progress-steps .step');
    
    if (nextStepButtons.length && prevStepButtons.length) {
        nextStepButtons.forEach(button => {
            button.addEventListener('click', function() {
                const currentStep = document.querySelector('.form-step.active');
                const nextStepId = this.getAttribute('data-next');
                const nextStep = document.getElementById(nextStepId);
                
                // Validate current step before proceeding
                if (validateStep(currentStep)) {
                    // Move to next step
                    currentStep.classList.remove('active');
                    nextStep.classList.add('active');
                    
                    // Update progress steps
                    updateProgressSteps(nextStepId);
                    
                    // Scroll to top of form
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            });
        });
        
        prevStepButtons.forEach(button => {
            button.addEventListener('click', function() {
                const currentStep = document.querySelector('.form-step.active');
                const prevStepId = this.getAttribute('data-prev');
                const prevStep = document.getElementById(prevStepId);
                
                // Move to previous step
                currentStep.classList.remove('active');
                prevStep.classList.add('active');
                
                // Update progress steps
                updateProgressSteps(prevStepId);
                
                // Scroll to top of form
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        });
    }
    
    function validateStep(step) {
        const inputs = step.querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.classList.add('is-invalid');
                isValid = false;
            } else {
                input.classList.remove('is-invalid');
                
                // Additional validation for specific fields
                if (input.type === 'email' && !validateEmail(input.value)) {
                    input.classList.add('is-invalid');
                    isValid = false;
                }
                
                if (input.id === 'phone' && !validatePhone(input.value)) {
                    input.classList.add('is-invalid');
                    isValid = false;
                }
            }
        });
        
        if (!isValid) {
            // Scroll to first invalid input
            const firstInvalid = step.querySelector('.is-invalid');
            if (firstInvalid) {
                firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
        
        return isValid;
    }
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function validatePhone(phone) {
        const re = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
        return re.test(phone);
    }
    
    function updateProgressSteps(activeStepId) {
        const activeStepNumber = parseInt(activeStepId.replace('step', ''));
        
        progressSteps.forEach(step => {
            const stepNumber = parseInt(step.getAttribute('data-step'));
            
            if (stepNumber < activeStepNumber) {
                step.classList.add('completed');
                step.classList.add('active');
            } else if (stepNumber === activeStepNumber) {
                step.classList.add('active');
                step.classList.remove('completed');
            } else {
                step.classList.remove('active');
                step.classList.remove('completed');
            }
        });
    }

    // Form submission
    const enrollmentForm = document.getElementById('enrollmentForm');
    if (enrollmentForm) {
        enrollmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate the final step
            const currentStep = document.querySelector('.form-step.active');
            if (validateStep(currentStep)) {
                // Gather all form data
                const formData = {
                    personal: {
                        firstName: document.getElementById('firstName').value,
                        lastName: document.getElementById('lastName').value,
                        email: document.getElementById('email').value,
                        phone: document.getElementById('phone').value,
                        dob: document.getElementById('dob').value,
                        gender: document.getElementById('gender').value,
                        city: document.getElementById('city').value,
                        postalCode: document.getElementById('postalCode').value,
                        address: document.getElementById('address').value,
                        photo: document.getElementById('photo').files[0]?.name || 'No file uploaded'
                    },
                    education: {
                        highestQualification: document.getElementById('highestQualification').value === 'other' 
                            ? document.getElementById('otherQualification').value 
                            : document.getElementById('highestQualification').value,
                        institution: document.getElementById('institution').value,
                        fieldOfStudy: document.getElementById('fieldOfStudy').value,
                        yearCompleted: document.getElementById('yearCompleted').value,
                        hasCertifications: document.querySelector('input[name="hasCertifications"]:checked').value,
                        certifications: document.getElementById('certifications')?.value || 'None',
                        resume: document.getElementById('resume').files[0]?.name || 'No file uploaded'
                    },
                    course: {
                        interest: document.getElementById('interest').value === 'other' 
                            ? document.getElementById('otherInterest').value 
                            : document.getElementById('interest').value,
                        course: document.getElementById('course').value,
                        learningMode: document.querySelector('input[name="learningMode"]:checked').value,
                        preferredSchedule: document.getElementById('preferredSchedule').value,
                        startDate: document.getElementById('startDate').value,
                        referral: document.getElementById('referral').value === 'other' 
                            ? document.getElementById('otherReferral').value 
                            : document.getElementById('referral').value || 'Not specified'
                    }
                };
                
                // Update review section
                updateReviewSection(formData);
                
                // Show photo in review if available
                const photoFile = document.getElementById('photo').files[0];
                if (photoFile) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        document.getElementById('reviewPhoto').src = e.target.result;
                        document.getElementById('reviewPhoto').style.display = 'block';
                    };
                    reader.readAsDataURL(photoFile);
                }
                
                // In a real application, you would send the formData to your server here
                // For demonstration, we'll show a success modal
                document.getElementById('confirmationEmail').textContent = formData.personal.email;
                const successModal = new bootstrap.Modal(document.getElementById('successModal'));
                successModal.show();
                
                // Reset form after successful submission
                setTimeout(() => {
                    enrollmentForm.reset();
                    document.querySelectorAll('.form-step').forEach(step => step.classList.remove('active'));
                    document.getElementById('step1').classList.add('active');
                    document.querySelectorAll('.progress-steps .step').forEach(step => {
                        step.classList.remove('active', 'completed');
                    });
                    document.querySelector('.progress-steps .step[data-step="1"]').classList.add('active');
                    photoPreview.innerHTML = '';
                    document.getElementById('reviewPhoto').style.display = 'none';
                    successModal.hide();
                }, 5000);
            }
        });
    }
    
    function updateReviewSection(formData) {
        // Personal Information
        document.getElementById('reviewName').textContent = `${formData.personal.firstName} ${formData.personal.lastName}`;
        document.getElementById('reviewEmail').textContent = formData.personal.email;
        document.getElementById('reviewPhone').textContent = formData.personal.phone;
        document.getElementById('reviewDob').textContent = formatDate(formData.personal.dob);
        document.getElementById('reviewGender').textContent = capitalizeFirstLetter(formData.personal.gender);
        document.getElementById('reviewAddress').textContent = formData.personal.address;
        document.getElementById('reviewCity').textContent = formData.personal.city;
        document.getElementById('reviewPostalCode').textContent = formData.personal.postalCode;
        
        // Education Background
        document.getElementById('reviewQualification').textContent = formData.education.highestQualification;
        document.getElementById('reviewInstitution').textContent = formData.education.institution;
        document.getElementById('reviewFieldOfStudy').textContent = formData.education.fieldOfStudy;
        document.getElementById('reviewYearCompleted').textContent = formData.education.yearCompleted;
        document.getElementById('reviewCertifications').textContent = formData.education.hasCertifications === 'yes' 
            ? (formData.education.certifications || 'Not specified') 
            : 'None';
        
        // Course Details
        document.getElementById('reviewInterest').textContent = formData.course.interest;
        
        const selectedCourse = document.getElementById('course').options[document.getElementById('course').selectedIndex].text;
        document.getElementById('reviewCourse').textContent = selectedCourse;
        
        document.getElementById('reviewLearningMode').textContent = capitalizeFirstLetter(formData.course.learningMode.replace('-', ' '));
        document.getElementById('reviewSchedule').textContent = capitalizeFirstLetter(formData.course.preferredSchedule.replace('-', ' '));
        document.getElementById('reviewStartDate').textContent = formatDate(formData.course.startDate);
        document.getElementById('reviewReferral').textContent = formData.course.referral;
    }
    
    function formatDate(dateString) {
        if (!dateString) return 'Not specified';
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }
    
    function capitalizeFirstLetter(string) {
        if (!string) return '';
        return string.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    }
});