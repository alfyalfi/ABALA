import rawData from './curriculumData.json';
import { DayCurriculum } from '../types';
import { getRealPhoto } from '../services/mediaLibrary';

// Inject real photographic images dynamically to choices and prompts where applicable
const enrichedData: DayCurriculum[] = (rawData as DayCurriculum[]).map(day => {
  return {
    ...day,
    questions: day.questions.map(slot => {
      return {
        ...slot,
        variants: slot.variants.map(variant => {
          // Attempt real photo match for prompt or visual
          const promptPhoto = getRealPhoto(variant.prompt);
          
          return {
            ...variant,
            realImage: promptPhoto,
            choices: variant.choices.map(c => {
              const choicePhoto = getRealPhoto(c.label);
              return {
                ...c,
                realImage: choicePhoto
              };
            })
          };
        })
      };
    })
  };
});

export const ALL_DAYS = enrichedData;
