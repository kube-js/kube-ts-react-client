import React from 'react';
import CourseSection, { Section } from '../CourseSection';

interface Options {
  readonly sections: Section[];
}

const CourseSections = ({ sections }: Options) => {
  const [expandedIds, setExpandedIds] = React.useState<string[]>([
    sections[0].id,
  ]);

  const handleChange = (panelId: string) => (
    event: React.ChangeEvent<{}>,
    isExpanded: boolean
  ) => {
    if (isExpanded) {
      const updatedIds = Array.from(new Set([...expandedIds, panelId]));
      setExpandedIds(updatedIds);
    } else {
      const updatedIds = expandedIds.filter(id => id !== panelId);
      setExpandedIds(updatedIds);
    }
  };

  return (
    <div>
      {sections.map(section => (
        <CourseSection
          key={section.id}
          section={section}
          expandedIds={expandedIds}
          onChange={handleChange(section.id)}
        />
      ))}
    </div>
  );
};

export default CourseSections;
