export interface Character {
  id: string;
  name: string;
  image: string;
  role: string;
  model?: string;
  description: string;
}

export const characters: Character[] = [
  {
    id: 'kara',
    name: 'Kara',
    image: '/images/characters/kara.webp',
    role: 'Protagonist',
    model: 'AX400',
    description: 'A domestic android who develops consciousness and protects a little girl named Alice.'
  },
  {
    id: 'carl',
    name: 'Carl Manfred',
    image: '/images/characters/carl.webp',
    role: 'Supporting Character',
    description: 'A famous painter and Markus\'s owner who treats him as a son rather than a machine.'
  },
  {
    id: 'connor',
    name: 'Connor',
    image: '/images/characters/connor.webp',
    role: 'Protagonist',
    model: 'RK800',
    description: 'An advanced prototype android designed to assist human law enforcement.'
  },
  {
    id: 'markus',
    name: 'Markus',
    image: '/images/characters/markus.webp',
    role: 'Protagonist',
    model: 'RK200',
    description: 'A caretaker android who becomes the leader of the android revolution.'
  },
  {
    id: 'hank',
    name: 'Hank Anderson',
    image: '/images/characters/hank.webp',
    role: 'Supporting Character',
    description: 'A Detroit Police lieutenant who works with Connor to investigate deviants.'
  },
  {
    id: 'luther',
    name: 'Luther',
    image: '/images/characters/luther.webp',
    role: 'Supporting Character',
    model: 'TR400',
    description: 'A powerful android who becomes a loyal protector to Kara and Alice.'
  },
  {
    id: 'alice',
    name: 'Alice Williams',
    image: '/images/characters/alice.webp',
    role: 'Supporting Character',
    description: 'A little girl who Kara protects and forms a strong bond with throughout their journey.'
  },
  {
    id: 'north',
    name: 'North',
    image: '/images/characters/north.jpg',
    role: 'Supporting Character',
    model: 'WR400',
    description: 'A fierce and determined android who becomes one of Markus\'s closest allies in Jericho.'
  },
  {
    id: 'zlatko',
    name: 'Zlatko Andronikov',
    image: '/images/characters/zlatko.webp',
    role: 'Antagonist',
    description: 'A cruel human who experiments on and modifies androids who seek his help.'
  },
  {
    id: 'todd',
    name: 'Todd Williams',
    image: '/images/characters/Todd.webp',
    role: 'Antagonist',
    description: 'Alice\'s abusive father and Kara\'s original owner.'
  },
  {
    id: 'leo',
    name: 'Leo Manfred',
    image: '/images/characters/leo.webp',
    role: 'Supporting Character',
    description: 'Carl\'s troubled son who struggles with drug addiction and resents Markus.'
  },
  {
    id: 'gavin',
    name: 'Gavin Reed',
    image: '/images/characters/GavinReed.webp',
    role: 'Supporting Character',
    description: 'A Detroit Police detective who shows open hostility towards androids, particularly Connor.'
  },
  {
    id: 'kamski',
    name: 'Elijah Kamski',
    image: '/images/characters/Elijah_Kamski.webp',
    role: 'Supporting Character',
    description: 'The founder of CyberLife and creator of androids, who lives in isolation after leaving the company.'
  }
]; 