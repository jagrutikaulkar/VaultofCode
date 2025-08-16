document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const form = document.getElementById('resumeForm');
    const resumePreview = document.getElementById('resumePreview');
    const progressBar = document.getElementById('progressBar');
    
    // Form Inputs
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const summaryInput = document.getElementById('summary');
    const otherSkillsInput = document.getElementById('otherSkills');
    
    // Resume Preview Elements
    const resumeName = document.getElementById('resumeName');
    const resumeEmail = document.getElementById('resumeEmail');
    const resumePhone = document.getElementById('resumePhone');
    const resumeSummary = document.getElementById('resumeSummary');
    const resumeEducation = document.getElementById('resumeEducation');
    const resumeExperience = document.getElementById('resumeExperience');
    const resumeSkills = document.getElementById('resumeSkills');
    
    // Buttons
    const addEducationBtn = document.getElementById('addEducation');
    const addExperienceBtn = document.getElementById('addExperience');
    const clearFormBtn = document.getElementById('clearForm');
    const downloadPDFBtn = document.getElementById('downloadPDF');
    
    // Skill Checkboxes
    const skillCheckboxes = document.querySelectorAll('.skills-container input[type="checkbox"]');
    
    // Track form completion
    const totalFields = document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], textarea').length;
    let completedFields = 0;
    
    // Event Listeners for basic info
    nameInput.addEventListener('input', updateResume);
    emailInput.addEventListener('input', updateResume);
    phoneInput.addEventListener('input', updateResume);
    summaryInput.addEventListener('input', updateResume);
    otherSkillsInput.addEventListener('input', updateSkills);
    
    // Add education entry
    addEducationBtn.addEventListener('click', addEducationField);
    
    // Add experience entry
    addExperienceBtn.addEventListener('click', addExperienceField);
    
    // Clear form
    clearFormBtn.addEventListener('click', clearForm);
    
    // Download PDF
    downloadPDFBtn.addEventListener('click', generatePDF);
    
    // Skill checkboxes
    skillCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateSkills);
    });
    
    // Initialize with one education and one experience field
    addEducationField();
    addExperienceField();
    
    // Update resume function
    function updateResume() {
        // Update basic info
        resumeName.textContent = nameInput.value || 'Your Name';
        resumeEmail.textContent = emailInput.value || 'email@example.com';
        resumePhone.textContent = phoneInput.value || '(123) 456-7890';
        resumeSummary.textContent = summaryInput.value || 'Experienced professional with a diverse skill set...';
        
        // Update progress bar
        updateProgressBar();
    }
    
    // Update skills section
    function updateSkills() {
        // Clear current skills
        resumeSkills.innerHTML = '';
        
        // Add checked skills
        skillCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                const skillTag = document.createElement('span');
                skillTag.className = 'skill-tag';
                skillTag.textContent = checkbox.value;
                resumeSkills.appendChild(skillTag);
            }
        });
        
        // Add other skills
        if (otherSkillsInput.value) {
            const otherSkills = otherSkillsInput.value.split(',').map(skill => skill.trim());
            otherSkills.forEach(skill => {
                if (skill) {
                    const skillTag = document.createElement('span');
                    skillTag.className = 'skill-tag';
                    skillTag.textContent = skill;
                    resumeSkills.appendChild(skillTag);
                }
            });
        }
        
        // If no skills, add placeholder
        if (resumeSkills.children.length === 0) {
            const placeholder = document.createElement('span');
            placeholder.className = 'skill-tag';
            placeholder.textContent = 'Add your skills';
            resumeSkills.appendChild(placeholder);
        }
    }
    
    // Add education field
    function addEducationField() {
        const educationFields = document.getElementById('educationFields');
        const educationCount = educationFields.children.length;
        
        const educationEntry = document.createElement('div');
        educationEntry.className = 'education-entry';
        educationEntry.innerHTML = `
            <div class="form-group">
                <label>Institution</label>
                <input type="text" class="institution" placeholder="University Name" ${educationCount === 0 ? 'required' : ''}>
            </div>
            <div class="form-group">
                <label>Degree</label>
                <input type="text" class="degree" placeholder="Bachelor of Science">
            </div>
            <div class="form-group">
                <label>Field of Study</label>
                <input type="text" class="field" placeholder="Computer Science">
            </div>
            <div class="form-group">
                <label>Graduation Year</label>
                <input type="text" class="year" placeholder="2020">
            </div>
            ${educationCount > 0 ? '<button type="button" class="remove-btn" title="Remove this education">×</button>' : ''}
        `;
        
        educationFields.appendChild(educationEntry);
        
        // Add event listeners to new inputs
        const inputs = educationEntry.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('input', updateEducationPreview);
        });
        
        // Add remove button event listener
        const removeBtn = educationEntry.querySelector('.remove-btn');
        if (removeBtn) {
            removeBtn.addEventListener('click', function() {
                educationEntry.remove();
                updateEducationPreview();
                updateProgressBar();
            });
        }
        
        // Update preview
        updateEducationPreview();
        updateProgressBar();
    }
    
    // Update education preview
    function updateEducationPreview() {
        resumeEducation.innerHTML = '';
        
        const educationEntries = document.querySelectorAll('.education-entry');
        
        if (educationEntries.length === 0) {
            const placeholder = document.createElement('div');
            placeholder.className = 'education-item';
            placeholder.innerHTML = `
                <h4>University Name</h4>
                <p class="degree">Bachelor of Science in Computer Science</p>
                <p class="year">Graduated: 2020</p>
            `;
            resumeEducation.appendChild(placeholder);
            return;
        }
        
        educationEntries.forEach(entry => {
            const institution = entry.querySelector('.institution').value || 'University Name';
            const degree = entry.querySelector('.degree').value || 'Bachelor of Science';
            const field = entry.querySelector('.field').value;
            const year = entry.querySelector('.year').value || '2020';
            
            const educationItem = document.createElement('div');
            educationItem.className = 'education-item';
            
            let degreeText = degree;
            if (field) {
                degreeText += ` in ${field}`;
            }
            
            educationItem.innerHTML = `
                <h4>${institution}</h4>
                <p class="degree">${degreeText}</p>
                <p class="year">Graduated: ${year}</p>
            `;
            
            resumeEducation.appendChild(educationItem);
        });
    }
    
    // Add experience field
    function addExperienceField() {
        const experienceFields = document.getElementById('experienceFields');
        const experienceCount = experienceFields.children.length;
        
        const experienceEntry = document.createElement('div');
        experienceEntry.className = 'experience-entry';
        experienceEntry.innerHTML = `
            <div class="form-group">
                <label>Job Title</label>
                <input type="text" class="job-title" placeholder="Software Developer" ${experienceCount === 0 ? 'required' : ''}>
            </div>
            <div class="form-group">
                <label>Company</label>
                <input type="text" class="company" placeholder="Tech Corp Inc.">
            </div>
            <div class="form-group">
                <label>Duration</label>
                <input type="text" class="duration" placeholder="2018 - Present">
            </div>
            <div class="form-group">
                <label>Responsibilities</label>
                <textarea class="responsibilities" rows="3" placeholder="Developed web applications..."></textarea>
            </div>
            ${experienceCount > 0 ? '<button type="button" class="remove-btn" title="Remove this experience">×</button>' : ''}
        `;
        
        experienceFields.appendChild(experienceEntry);
        
        // Add event listeners to new inputs
        const inputs = experienceEntry.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', updateExperiencePreview);
        });
        
        // Add remove button event listener
        const removeBtn = experienceEntry.querySelector('.remove-btn');
        if (removeBtn) {
            removeBtn.addEventListener('click', function() {
                experienceEntry.remove();
                updateExperiencePreview();
                updateProgressBar();
            });
        }
        
        // Update preview
        updateExperiencePreview();
        updateProgressBar();
    }
    
    // Update experience preview
    function updateExperiencePreview() {
        resumeExperience.innerHTML = '';
        
        const experienceEntries = document.querySelectorAll('.experience-entry');
        
        if (experienceEntries.length === 0) {
            const placeholder = document.createElement('div');
            placeholder.className = 'experience-item';
            placeholder.innerHTML = `
                <h4>Software Developer</h4>
                <p class="company">Tech Corp Inc.</p>
                <p class="duration">2018 - Present</p>
                <p class="responsibilities">Developed web applications using modern frameworks...</p>
            `;
            resumeExperience.appendChild(placeholder);
            return;
        }
        
        experienceEntries.forEach(entry => {
            const jobTitle = entry.querySelector('.job-title').value || 'Job Title';
            const company = entry.querySelector('.company').value || 'Company Name';
            const duration = entry.querySelector('.duration').value || 'Duration';
            const responsibilities = entry.querySelector('.responsibilities').value || 'Responsibilities description...';
            
            const experienceItem = document.createElement('div');
            experienceItem.className = 'experience-item';
            
            experienceItem.innerHTML = `
                <h4>${jobTitle}</h4>
                <p class="company">${company}</p>
                <p class="duration">${duration}</p>
                <p class="responsibilities">${responsibilities}</p>
            `;
            
            resumeExperience.appendChild(experienceItem);
        });
    }
    
    // Update progress bar
    function updateProgressBar() {
        const allInputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], textarea');
        let filledCount = 0;
        
        allInputs.forEach(input => {
            if (input.value.trim() !== '') {
                filledCount++;
            }
        });
        
        const percentage = (filledCount / totalFields) * 100;
        progressBar.style.width = `${percentage}%`;
        
        // Change color based on completion
        if (percentage < 30) {
            progressBar.style.backgroundColor = '#e74c3c'; // Red
        } else if (percentage < 70) {
            progressBar.style.backgroundColor = '#f39c12'; // Orange
        } else {
            progressBar.style.backgroundColor = '#2ecc71'; // Green
        }
    }
    
    // Clear form
    function clearForm() {
        form.reset();
        document.getElementById('educationFields').innerHTML = '';
        document.getElementById('experienceFields').innerHTML = '';
        
        // Uncheck all skill checkboxes
        skillCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        
        // Reset preview
        updateResume();
        updateEducationPreview();
        updateExperiencePreview();
        updateSkills();
        
        // Add back one education and one experience field
        addEducationField();
        addExperienceField();
    }
    
    // Generate PDF - WORKING VERSION
    async function generatePDF() {
        // Show loading state
        const originalBtnText = downloadPDFBtn.innerHTML;
        downloadPDFBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating PDF...';
        downloadPDFBtn.disabled = true;

        try {
            // Get the resume element
            const element = document.getElementById('resumePreview');
            
            // Create a clone of the element to avoid styling issues
            const clonedElement = element.cloneNode(true);
            clonedElement.style.width = '800px';
            clonedElement.style.padding = '20px';
            clonedElement.style.boxSizing = 'border-box';
            
            // Create a container for the clone
            const container = document.createElement('div');
            container.appendChild(clonedElement);
            container.style.position = 'fixed';
            container.style.left = '-9999px';
            container.style.top = '0';
            document.body.appendChild(container);

            // Options for html2pdf
            const opt = {
                margin: 10,
                filename: 'resume.pdf',
                image: { 
                    type: 'jpeg', 
                    quality: 1 
                },
                html2canvas: { 
                    scale: 2,
                    logging: true,
                    useCORS: true,
                    allowTaint: true,
                    scrollX: 0,
                    scrollY: 0,
                    windowWidth: 800,
                    letterRendering: true
                },
                jsPDF: { 
                    unit: 'mm', 
                    format: 'a4', 
                    orientation: 'portrait' 
                }
            };

            // Add delay to ensure rendering
            await new Promise(resolve => setTimeout(resolve, 300));
            
            // Generate PDF
            await html2pdf().set(opt).from(clonedElement).save();
            
            // Clean up
            document.body.removeChild(container);
        } catch (error) {
            console.error('PDF generation failed:', error);
            alert('PDF generation failed. Please try again.');
        } finally {
            // Restore button state
            downloadPDFBtn.innerHTML = originalBtnText;
            downloadPDFBtn.disabled = false;
        }
    }
    
    // Initialize
    updateResume();
    updateEducationPreview();
    updateExperiencePreview();
    updateSkills();
});