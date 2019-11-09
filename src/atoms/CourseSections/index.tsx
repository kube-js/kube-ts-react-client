import React from 'react';
import Section from '../../types/items/Section';
import CourseSection from '../CourseSection';

interface Options {
  readonly sections: Section[];
}

const CourseSections = ({ sections }: Options) => {
  const sortedSections = sections.sort((x: Section, y: Section) => x.order - y.order);

  const [expandedIds, setExpandedIds] = React.useState<string[]>([
    sortedSections[0].id,
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
      {sortedSections.map(section => (
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
