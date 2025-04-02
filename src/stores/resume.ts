import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface ResumeBasics {
  name: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  picture: string;
}

export interface WorkExperience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  institution: string;
  area: string;
  studyType: string;
  startDate: string;
  endDate: string;
}

export interface Skill {
  name: string;
  level: string;
  keywords: string[];
}

export interface Project {
  name: string;
  description: string;
  url: string;
  startDate: string;
  endDate: string;
  keywords: string[];
}

export interface ResumeData {
  basics: ResumeBasics;
  work: WorkExperience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  sections: string[];
}

const defaultResumeData: ResumeData = {
  basics: {
    name: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
    picture: '',
  },
  work: [],
  education: [],
  skills: [],
  projects: [],
  sections: ['basics', 'work', 'education', 'skills', 'projects'],
};

export const useResumeStore = defineStore('resume', () => {
  const resumeData = ref<ResumeData>(defaultResumeData);

  function updateBasics(basics: Partial<ResumeBasics>) {
    resumeData.value.basics = { ...resumeData.value.basics, ...basics };
  }

  function addWorkExperience(work: WorkExperience) {
    resumeData.value.work.push(work);
  }

  function updateWorkExperience(index: number, work: Partial<WorkExperience>) {
    if (index >= 0 && index < resumeData.value.work.length) {
      resumeData.value.work[index] = { ...resumeData.value.work[index], ...work };
    }
  }

  function removeWorkExperience(index: number) {
    resumeData.value.work.splice(index, 1);
  }

  function addEducation(education: Education) {
    resumeData.value.education.push(education);
  }

  function updateEducation(index: number, education: Partial<Education>) {
    if (index >= 0 && index < resumeData.value.education.length) {
      resumeData.value.education[index] = { ...resumeData.value.education[index], ...education };
    }
  }

  function removeEducation(index: number) {
    resumeData.value.education.splice(index, 1);
  }

  function addSkill(skill: Skill) {
    resumeData.value.skills.push(skill);
  }

  function updateSkill(index: number, skill: Partial<Skill>) {
    if (index >= 0 && index < resumeData.value.skills.length) {
      resumeData.value.skills[index] = { ...resumeData.value.skills[index], ...skill };
    }
  }

  function removeSkill(index: number) {
    resumeData.value.skills.splice(index, 1);
  }

  function addProject(project: Project) {
    resumeData.value.projects.push(project);
  }

  function updateProject(index: number, project: Partial<Project>) {
    if (index >= 0 && index < resumeData.value.projects.length) {
      resumeData.value.projects[index] = { ...resumeData.value.projects[index], ...project };
    }
  }

  function removeProject(index: number) {
    resumeData.value.projects.splice(index, 1);
  }

  function updateSections(sections: string[]) {
    resumeData.value.sections = sections;
  }

  // 数据导入导出功能
  function importData(data: ResumeData) {
    resumeData.value = data;
  }

  function exportData(): ResumeData {
    return resumeData.value;
  }

  // 重置功能
  function resetData() {
    resumeData.value = { ...defaultResumeData };
  }

  return {
    resumeData,
    updateBasics,
    addWorkExperience,
    updateWorkExperience,
    removeWorkExperience,
    addEducation,
    updateEducation,
    removeEducation,
    addSkill,
    updateSkill,
    removeSkill,
    addProject,
    updateProject,
    removeProject,
    updateSections,
    importData,
    exportData,
    resetData,
  };
}, {
  persist: {
    key: 'resume-data',
    storage: localStorage,
  },
}); 