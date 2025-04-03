import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export interface ResumeTheme {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    text: string;
    background: string;
  };
  fontFamily: string;
}

const defaultThemes: ResumeTheme[] = [
  {
    id: 'modern',
    name: 'Modern',
    colors: {
      primary: '#10B981',    // 清新的绿色
      secondary: '#059669',  // 深一点的绿色
      text: '#1F2937',      // 深灰色文本
      background: '#FFFFFF', // 纯白背景
    },
    fontFamily: 'Inter',
  },
  {
    id: 'classic',
    name: 'Classic',
    colors: {
      primary: '#374151',
      secondary: '#111827',
      text: '#1f2937',
      background: '#ffffff',
    },
    fontFamily: 'Merriweather',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    colors: {
      primary: '#000000',
      secondary: '#4b5563',
      text: '#1f2937',
      background: '#ffffff',
    },
    fontFamily: 'Roboto',
  },
];

export const useThemeStore = defineStore('theme', () => {
  const themes = ref<ResumeTheme[]>(defaultThemes);
  const currentThemeId = ref<string>('modern');
  const isDarkMode = ref<boolean>(false);

  const currentTheme = computed(() => 
    themes.value.find((theme) => theme.id === currentThemeId.value) || themes.value[0]
  );

  function setTheme(themeId: string) {
    if (themes.value.some((theme) => theme.id === themeId)) {
      currentThemeId.value = themeId;
    }
  }

  function toggleDarkMode() {
    isDarkMode.value = !isDarkMode.value;
  }

  function addCustomTheme(theme: ResumeTheme) {
    themes.value.push(theme);
  }

  function updateTheme(themeId: string, updates: Partial<ResumeTheme>) {
    const index = themes.value.findIndex((theme) => theme.id === themeId);
    if (index !== -1) {
      themes.value[index] = { ...themes.value[index], ...updates };
    }
  }

  function removeCustomTheme(themeId: string) {
    const index = themes.value.findIndex((theme) => theme.id === themeId);
    if (index !== -1 && !defaultThemes.some((theme) => theme.id === themeId)) {
      themes.value.splice(index, 1);
      if (currentThemeId.value === themeId) {
        currentThemeId.value = themes.value[0].id;
      }
    }
  }

  return {
    themes,
    currentTheme,
    currentThemeId,
    isDarkMode,
    setTheme,
    toggleDarkMode,
    addCustomTheme,
    updateTheme,
    removeCustomTheme,
  };
}); 