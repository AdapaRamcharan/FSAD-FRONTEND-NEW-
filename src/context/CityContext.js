import React, { createContext, useContext, useState } from 'react';
import { cityData } from '../data/cityData';

const CityContext = createContext(null);
export const useCity = () => useContext(CityContext);

export const CityProvider = ({ children }) => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [issues, setIssues] = useState(() => {
    const saved = localStorage.getItem('smartcity_issues');
    if (saved) {
      // Fix legacy data: convert in_progress to in-progress
      const parsed = JSON.parse(saved);
      const fixed = parsed.map(i => ({
        ...i,
        status: i.status === 'in_progress' ? 'in-progress' : i.status
      }));
      localStorage.setItem('smartcity_issues', JSON.stringify(fixed));
      return fixed;
    }
    return generateSampleIssues();
  });
  const [feedbacks, setFeedbacks] = useState(() => {
    const saved = localStorage.getItem('smartcity_feedbacks');
    return saved ? JSON.parse(saved) : [];
  });

  const selectCity = (cityId) => {
    const city = cityData.find(c => c.id === cityId);
    setSelectedCity(city);
  };

  const addIssue = (issue) => {
    const newIssue = {
      ...issue,
      id: Date.now().toString(),
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      comments: []
    };
    const updated = [newIssue, ...issues];
    setIssues(updated);
    localStorage.setItem('smartcity_issues', JSON.stringify(updated));
    return newIssue;
  };

  const updateIssueStatus = (issueId, status, comment) => {
    const updated = issues.map(i => {
      if (i.id === issueId) {
        const comments = [...(i.comments || [])];
        if (comment) {
          comments.push({ text: comment, date: new Date().toISOString(), by: 'Admin' });
        }
        return { ...i, status, updatedAt: new Date().toISOString(), comments };
      }
      return i;
    });
    setIssues(updated);
    localStorage.setItem('smartcity_issues', JSON.stringify(updated));
  };

  const addFeedback = (feedback) => {
    const newFeedback = {
      ...feedback,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    const updated = [newFeedback, ...feedbacks];
    setFeedbacks(updated);
    localStorage.setItem('smartcity_feedbacks', JSON.stringify(updated));
  };

  return (
    <CityContext.Provider value={{
      cities: cityData,
      selectedCity,
      selectCity,
      issues,
      addIssue,
      updateIssueStatus,
      feedbacks,
      addFeedback
    }}>
      {children}
    </CityContext.Provider>
  );
};

function generateSampleIssues() {
  const categories = ['pothole', 'garbage', 'water_leak', 'streetlight', 'road_damage', 'sewage'];
  const statuses = ['pending', 'in-progress', 'resolved'];
  const cityIds = ['hyderabad', 'chennai', 'mumbai', 'delhi'];
  const sampleIssues = [];
  const descriptions = [
    'Large pothole on main road causing accidents',
    'Garbage not collected for 3 days in residential area',
    'Water pipeline leaking near market area',
    'Streetlight not working for 2 weeks',
    'Road surface damaged after heavy rains',
    'Sewage overflow in residential colony',
    'Broken footpath near school zone',
    'Illegal dumping ground near park',
    'Water supply disruption in sector 5',
    'Traffic signal malfunction at major intersection',
    'Damaged road divider on highway',
    'Overflowing drainage near bus stop'
  ];

  for (let i = 0; i < 24; i++) {
    sampleIssues.push({
      id: `sample-${i + 1}`,
      title: descriptions[i % descriptions.length],
      category: categories[i % categories.length],
      description: descriptions[i % descriptions.length] + '. This needs immediate attention from the municipal authorities.',
      city: cityIds[i % 4],
      location: `Ward ${(i % 20) + 1}, Zone ${(i % 5) + 1}`,
      status: statuses[i % 3],
      priority: i % 3 === 0 ? 'high' : i % 3 === 1 ? 'medium' : 'low',
      reportedBy: `User ${i + 1}`,
      reporterEmail: `user${i + 1}@example.com`,
      createdAt: new Date(Date.now() - (i * 86400000 * 2)).toISOString(),
      updatedAt: new Date(Date.now() - (i * 86400000)).toISOString(),
      comments: [],
      image: null,
      lat: 17.385 + (Math.random() - 0.5) * 0.1,
      lng: 78.4867 + (Math.random() - 0.5) * 0.1
    });
  }
  localStorage.setItem('smartcity_issues', JSON.stringify(sampleIssues));
  return sampleIssues;
}
