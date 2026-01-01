export interface Exercise {
  name: string;
  duration?: string;
  reps?: string;
  sets?: number;
}

export interface WorkoutDay {
  id: string;
  day: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate';
  warmup: Exercise[];
  main: Exercise[];
  cooldown: Exercise[];
}

export const workoutPlan: WorkoutDay[] = [
  {
    id: 'monday',
    day: 'Monday',
    title: 'Full Body Awakening',
    description: 'A gentle but effective full-body session to kickstart your week with energy.',
    duration: '25 min',
    difficulty: 'Beginner',
    warmup: [
      { name: 'Neck Circles', duration: '1 min' },
      { name: 'Shoulder Rolls', duration: '1 min' },
      { name: 'Arm Circles', duration: '1 min' },
      { name: 'Hip Circles', duration: '1 min' },
    ],
    main: [
      { name: 'Bodyweight Squats', reps: '15 reps', sets: 3 },
      { name: 'Push-ups (Knee or Full)', reps: '10 reps', sets: 3 },
      { name: 'Walking Lunges', reps: '12 reps per leg', sets: 2 },
      { name: 'Plank Hold', duration: '30 sec', sets: 3 },
      { name: 'Glute Bridges', reps: '15 reps', sets: 2 },
    ],
    cooldown: [
      { name: 'Child\'s Pose', duration: '1 min' },
      { name: 'Cat-Cow Stretch', duration: '1 min' },
      { name: 'Cobra Stretch', duration: '30 sec' },
    ]
  },
  {
    id: 'tuesday',
    day: 'Tuesday',
    title: 'Core & Stability',
    description: 'Focus on strengthening your midsection and improving your balance.',
    duration: '20 min',
    difficulty: 'Beginner',
    warmup: [
      { name: 'Torso Twists', duration: '1 min' },
      { name: 'Bird-Dog', reps: '10 reps' },
      { name: 'High Knees', duration: '1 min' },
    ],
    main: [
      { name: 'Dead Bugs', reps: '12 reps', sets: 3 },
      { name: 'Side Plank', duration: '20 sec per side', sets: 2 },
      { name: 'Mountain Climbers', duration: '30 sec', sets: 3 },
      { name: 'Bicycle Crunches', reps: '20 reps', sets: 2 },
      { name: 'Superman Hold', duration: '30 sec', sets: 3 },
    ],
    cooldown: [
      { name: 'Spinal Twist', duration: '1 min per side' },
      { name: 'Knees-to-Chest', duration: '1 min' },
    ]
  },
  {
    id: 'wednesday',
    day: 'Wednesday',
    title: 'Active Recovery',
    description: 'A day to move your body gently and focus on flexibility.',
    duration: '15 min',
    difficulty: 'Beginner',
    warmup: [
      { name: 'Light Marching', duration: '2 min' },
    ],
    main: [
      { name: 'Standing Quad Stretch', duration: '45 sec per side' },
      { name: 'Hamstring Stretch', duration: '45 sec per side' },
      { name: 'Chest Opener', duration: '1 min' },
      { name: 'Downward Dog', duration: '1 min' },
      { name: 'Forward Fold', duration: '1 min' },
    ],
    cooldown: [
      { name: 'Deep Breathing', duration: '2 min' },
    ]
  },
  {
    id: 'thursday',
    day: 'Thursday',
    title: 'Upper Body Tone',
    description: 'Sculpt and strengthen your arms, shoulders, and back.',
    duration: '30 min',
    difficulty: 'Intermediate',
    warmup: [
      { name: 'Arm Swings', duration: '1 min' },
      { name: 'Wrist Rotations', duration: '1 min' },
      { name: 'Wall Push-ups', reps: '10 reps' },
    ],
    main: [
      { name: 'Incline Push-ups', reps: '12 reps', sets: 3 },
      { name: 'Tricep Dips (using a chair)', reps: '10 reps', sets: 3 },
      { name: 'Plank Taps', reps: '20 reps', sets: 3 },
      { name: 'Pike Push-ups', reps: '8 reps', sets: 2 },
      { name: 'Wall Sit', duration: '45 sec', sets: 2 },
    ],
    cooldown: [
      { name: 'Tricep Stretch', duration: '30 sec per side' },
      { name: 'Cross-Body Shoulder Stretch', duration: '30 sec per side' },
    ]
  },
  {
    id: 'friday',
    day: 'Friday',
    title: 'Lower Body Power',
    description: 'Focus on legs and glutes for a strong foundation.',
    duration: '35 min',
    difficulty: 'Intermediate',
    warmup: [
      { name: 'Leg Swings', reps: '10 per leg' },
      { name: 'Butt Kicks', duration: '1 min' },
      { name: 'Bodyweight Squats', reps: '10 reps' },
    ],
    main: [
      { name: 'Sumo Squats', reps: '15 reps', sets: 3 },
      { name: 'Reverse Lunges', reps: '12 reps per leg', sets: 3 },
      { name: 'Curtsy Lunges', reps: '10 reps per leg', sets: 2 },
      { name: 'Single Leg Glute Bridges', reps: '10 reps per leg', sets: 2 },
      { name: 'Calf Raises', reps: '20 reps', sets: 3 },
    ],
    cooldown: [
      { name: 'Pigeon Pose', duration: '1 min per side' },
      { name: 'Butterfly Stretch', duration: '1 min' },
    ]
  },
  {
    id: 'saturday',
    day: 'Saturday',
    title: 'Full Body Sweat',
    description: 'A high-energy session to build endurance and burn calories.',
    duration: '40 min',
    difficulty: 'Intermediate',
    warmup: [
      { name: 'Jumping Jacks', duration: '1 min' },
      { name: 'Dynamic Lunges', reps: '10 reps' },
      { name: 'Arm Circles', duration: '1 min' },
    ],
    main: [
      { name: 'Burpees', reps: '10 reps', sets: 3 },
      { name: 'Mountain Climbers', duration: '45 sec', sets: 3 },
      { name: 'Jump Squats', reps: '12 reps', sets: 3 },
      { name: 'Plank to Push-up', reps: '10 reps', sets: 2 },
      { name: 'Speed Skaters', duration: '45 sec', sets: 2 },
    ],
    cooldown: [
      { name: 'Standing Side Stretch', duration: '30 sec per side' },
      { name: 'Quad Stretch', duration: '30 sec per side' },
      { name: 'Deep Relax', duration: '2 min' },
    ]
  },
  {
    id: 'sunday',
    day: 'Sunday',
    title: 'Rest & Restore',
    description: 'A day of complete rest or very light stretching to prepare for the week ahead.',
    duration: '10 min',
    difficulty: 'Beginner',
    warmup: [
      { name: 'Gentle Neck Tilts', duration: '1 min' },
    ],
    main: [
      { name: 'Lying Spinal Twist', duration: '2 min per side' },
      { name: 'Happy Baby Pose', duration: '1 min' },
      { name: 'Reclined Butterfly', duration: '2 min' },
    ],
    cooldown: [
      { name: 'Meditation/Deep Breathing', duration: '5 min' },
    ]
  },
];
