import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Award, X, Sparkles, ChevronRight } from 'lucide-react';
import Header from '../../components/Header';
import image from '../../assets/image6.jpg';
import pascalImg from '../../assets/testimony/Pascal Ndayisaba.png';
import buhangatImg from '../../assets/testimony/Buhanga Silas.png';
import ericImg from '../../assets/testimony/ERIC NDAYISABA.png';
import kibibiImg from '../../assets/testimony/KIBIBI MUTAGOMWA.png';
import maniraguhaImg from '../../assets/testimony/MANIRAGUHA CHANCE.png';
import mukamutaraImg from '../../assets/testimony/MUKAMUTARA ALVERA.png';
import ntabareshyaImg from '../../assets/testimony/NTABARESHYA BAUDOUIN.png';
import nuwayoImg from '../../assets/testimony/NUWAYO GAHINDO.png';
import jeanDeDieuImg from '../../assets/testimony/JEAN DE DIEU DUSABIMANA.png';
import muhireImg from '../../assets/testimony/MUHIRE SAMUEL-Claudio.png';
import mukeshimanaImg from '../../assets/testimony/Mukeshimana Angelique.png';
import uwimanaeImg from '../../assets/testimony/UWIMANA LOUISE.png';
import bahatiImg from '../../assets/testimony/BAHATI JUSTINE.png';

const testimonies = [
    {
        id: 1,
        image: pascalImg,
        name: "Pascal Ndayisaba",
        role: "Hope School First Intake · University of Rwanda, College of Law · USA",
        summary: "One of Hope School's first graduates, Pascal went on to study Law at the University of Rwanda. Today he is a father, a professional, and a community contributor living in the United States.",
        fullStory: {
            intro: "Pascal Ndayisaba is one of the earliest students to walk through the doors of Hope School in Gihembe Refugee Camp. When opportunities for refugee youth were scarce and the future felt uncertain, Hope School became the turning point that changed the trajectory of his life.",
            sections: [
                {
                    title: "First Intake Graduate",
                    content: "After graduating from the school's first intake, Pascal continued his education at the University of Rwanda, College of Law — a milestone that once felt impossible for a young refugee student. Today, he is a father, a professional, and a contributing member of society living in the United States."
                },
                {
                    title: "A Journey of Transformation",
                    content: "Pascal's journey reflects the power of education to break cycles of poverty and displacement. His success is not his alone — it is shared by his family, his community, and everyone who believed in the vision of Hope School.\n\nPascal is one of many Hope School graduates whose lives have been transformed. Across Rwanda, the United States, Canada, and beyond, alumni are now teachers, engineers, nurses, community leaders, and professionals giving back to their families and the world."
                },
                {
                    title: "Engineers4Humanity's Legacy",
                    content: "Engineers4Humanity is carrying forward the spirit and mission of Hope School — ensuring that refugee children continue to access education, mentorship, and opportunities that open doors to a brighter future. Pascal's story is proof of what is possible when a community invests in its youth."
                }
            ]
        }
    },
    {
        id: 2,
        image: buhangatImg,
        name: "Buhanga Silas",
        role: "Elders Committee Chairperson · Gihembe Refugee Camp · Kentucky, USA",
        summary: "As former Chairperson of the Elders Committee in Gihembe, Buhanga witnessed Hope School's birth firsthand — built by refugees, for refugees. Now resettled in Kentucky, his testimony carries the weight of a community's sacrifice.",
        fullStory: {
            intro: "My name is Buhanga Silas, former Chairperson of the Elders Committee in Gihembe Refugee Camp. Hope School was born during one of the darkest moments in our community. In 2008, when high school support ended, our children were left with no future. Many were orphans, many were extremely poor, and none had any support.",
            sections: [
                {
                    title: "How Hope School Was Born",
                    content: "But our youth from Forum Amis de la Paix stood up with courage. They mobilized the entire refugee community. As elders — together with the camp administration — we joined them. We contributed from our own food rations, and with that little money, our youth built classrooms with their own hands. That is how Hope School was born.\n\nHope School welcomed every child without discrimination. Teachers worked without salary. Our youth advocated in Rwandan schools so refugee students could continue their studies. Every child who sat for national exams passed. Many went on to university. Hope School became a miracle."
                },
                {
                    title: "When It Closed",
                    content: "When it closed, we felt the loss immediately — the quality of education dropped, discipline weakened, and even elders lost the reading and writing classes we depended on."
                },
                {
                    title: "The Weight of Refugee Life",
                    content: "Being a refugee means living in persistent poverty: not enough food, no cooking energy, no land, no collateral for loans, and families breaking under pressure. Elderly people suffer the most. Girls fall into risky behavior because opportunities are limited. Poverty destroys dignity."
                },
                {
                    title: "Gratitude to Engineers4Humanity",
                    content: "But I am grateful that Engineers4Humanity, under the leadership of Eric, continues the spirit of Hope School — refugees helping refugees. I knew Eric (Recky) as a courageous youth leader in Gihembe, advocating for children. Today, I am proud of the work he and his team continue to do."
                },
                {
                    title: "Messages",
                    content: "My message to Hope School alumni and young generation:\nYou are the fruit of sacrifice. Now become the seeds for the next generation. Support the youth who remain in the camps.\n\nMy message to refugee parents:\nTeach your children values, patience, and culture. Even without land, they can inherit dignity."
                }
            ]
        }
    },
    {
        id: 3,
        image: ericImg,
        name: "Eric Ndayisaba",
        role: "Director of Business Development, Engineers4Humanity · ALU Graduate · Rwanda",
        summary: "An orphan from Gihembe Refugee Camp who rose from having nothing to earning an ALU degree and leading business development at Engineers4Humanity. Eric is living proof that a chance can transform generations.",
        fullStory: {
            intro: "My name is Ndayisaba Eric, and I grew up as an orphan in Gihembe Refugee Camp. I had no support, no resources, and no clear future. After completing ordinary level, I had nowhere to go — no school, no job, and no hope.",
            sections: [
                {
                    title: "Hope School Opens a Door",
                    content: "Then Hope School opened its doors and changed my life. It welcomed me when I had nothing and gave me the chance to continue my education. Hope School did not just educate me — it saved my future."
                },
                {
                    title: "Scholarship to ALU",
                    content: "After graduating, I earned a scholarship to study International Business and Trade at the African Leadership University (ALU). By God's grace, I completed my degree and returned home determined to serve my community."
                },
                {
                    title: "Journey with Engineers4Humanity",
                    content: "My journey with Engineers4Humanity began when Eng. Kamanzi posted an opportunity for someone skilled in proposal writing and business development. I reached out immediately. He trusted me, interviewed me, and gave me the chance that transformed my life. I later served as Director of Finance and Administration, and today I continue as Director of Business Development.\n\nAt Engineers4Humanity, I contributed to major projects — schools, hospitals, roads, and youth scholarships — many funded by partners like Expertise France and the World Bank. Even when COVID-19 disrupted operations, the skills I gained opened new doors, allowing me to serve both KF Investment Ltd and Engineers4Humanity."
                },
                {
                    title: "Living Proof",
                    content: "Today, I am a husband, a father, and a leader. I am no longer the orphan boy with no future — I am living proof that when a refugee child is given a chance, a skill, a mentor, a community, and a purpose, they can rise. Your support does not just help one child — it transforms generations."
                },
                {
                    title: "Message to Refugee Youth",
                    content: "Do not give up. Your situation does not define your destiny. When you rise, lift others with you. If I could rise from Gihembe, you can too."
                }
            ]
        }
    },
    {
        id: 4,
        image: ntabareshyaImg,
        name: "Ntabareshya Baudouin",
        role: "Co-Founder & First Headmaster of Hope School · North Carolina, USA",
        summary: "Co-founder and first Headmaster of Hope School, Baudouin helped build a school from nothing — no classrooms, no funding — and achieved 100% national exam pass rates year after year. Over 500 graduates carry his legacy.",
        fullStory: {
            intro: "My name is Ntabareshya Baudouin, a Congolese refugee who grew up in Gihembe Refugee Camp. Today, I live in North Carolina, USA with my wife and three children — but my heart remains with the community that shaped me and the school God allowed us to build.",
            sections: [
                {
                    title: "Co-Founding Forum Amis de la Paix",
                    content: "In 2008, I helped co-found Forum Amis de la Paix, a youth movement created to restore hope, unity, and purpose among refugee youth. One year later, when high school education for refugees suddenly stopped, Forum made a historic decision: to create our own school — founded by refugees, for refugees."
                },
                {
                    title: "Building Hope School from Nothing",
                    content: "I was appointed as co-founder and the first Headmaster of Hope School. We had nothing — no classrooms, no materials, no funding. We started in a church building, borrowing benches and chalkboards. Teachers were university students volunteering their time. Parents later contributed from their food rations so we could buy chalk, notebooks, and give teachers a small incentive."
                },
                {
                    title: "100% Pass Rate — Year After Year",
                    content: "Yet despite these impossible conditions, a miracle happened: Hope School achieved a 100% national exam pass rate — year after year. Students from all three refugee camps studied in overcrowded rooms, without electricity or textbooks, but they succeeded. Their discipline and courage were extraordinary.\n\nOver the years, more than 500 students graduated from Hope School. Many went on to university. Many are now teachers, engineers, leaders, and responsible citizens across Rwanda, the USA, Canada, and Europe."
                },
                {
                    title: "The Journey Was Not Easy",
                    content: "We struggled to get exam access, school materials, and community support. I faced discouragement, including painful messages from parents that made me question why I had accepted such a heavy responsibility. But with encouragement from colleagues like Eric, I continued — because our children needed us.\n\nHope School shaped me as much as I shaped it. I learned leadership, patience, and how to manage people with compassion. Forum members became like family.\n\nToday, when I visit Gihembe and see the abandoned school buildings, I feel both sadness and pride. Sadness that the school closed — but pride that we built something unforgettable, something that changed lives forever."
                },
                {
                    title: "Messages",
                    content: "To Forum members: We still have strength. We still have ideas. Our community still needs us. Let us keep our vision alive. Never give up. Never lose hope.\n\nTo Hope School alumni: The school may have closed, but its spirit lives in you. Lead. Serve. Give back.\n\nTo donors: Support initiatives like Engineers4Humanity. Hope School was more than a school — it was a testimony of what refugees can achieve when they refuse to give up on their children."
                }
            ]
        }
    },
    {
        id: 5,
        image: bahatiImg,
        name: "Bahati Justine (Mama Condifa)",
        role: "Hope School Education Fund Leader · Engineers4Humanity Volunteer · Nashville, USA",
        summary: "Known as Mama Condifa, Bahati Justine rallied refugee women to support Hope School with their own food rations when there was no money. Her lifetime of service continues through Engineers4Humanity in Nashville, Tennessee.",
        fullStory: {
            intro: "My name is Bahati Justine, known as Mama Condifa, and I was one of the women leaders who helped build Hope School in Gihembe Refugee Camp. I still remember 2009, when Hope School was only an idea carried by courageous young people who refused to give up on our community. At that time, many of our youth were falling into drugs, early pregnancy, and hopelessness because they had no school and no opportunities.",
            sections: [
                {
                    title: "Women Uniting for Education",
                    content: "We refugee women stood beside these young leaders with everything we had. We had no money, but we had faith. We had unity. We had love for our children. We supported teachers with our own food rations because we believed education was the only path to dignity and self-reliance. And Hope School became a miracle. It protected our youth, restored discipline, and gave our children a future. Every child was treated as our own."
                },
                {
                    title: "Leadership Roles",
                    content: "As a leader of the Hope School Education Fund and the Women's Refugee Administration, I mobilized mothers, organized meetings, visited families, and later continued serving through Engineers4Humanity. Serving refugees has been my life's calling."
                },
                {
                    title: "When Hope School Closed",
                    content: "When Hope School closed, it was a deep loss — not only for youth, but also for elderly people who were learning to read and write through evening programs. Yet we remain grateful to Impact Hope and the Government of Rwanda for helping many children continue their education.\n\nToday, Hope School graduates are teachers, engineers, leaders, and responsible citizens across Rwanda, the USA, Canada, and Europe. Their success proves that refugee-led initiatives can transform lives. But our work is not finished. Refugee women still suffer the most from poverty, unemployment, and lack of opportunities."
                },
                {
                    title: "Messages",
                    content: "To the youth — especially girls: Believe in yourselves. Respect yourselves. Protect your future.\n\nTo the refugee community: Let us continue supporting one another. Let us be courageous.\n\nAnd to Eric, one of the courageous young founders of Forum and Hope School, now leading Engineers4Humanity — I am proud of you. Our community still needs people like you. Hope School may have closed, but its spirit lives on in every young person who chooses education, dignity, and service."
                }
            ]
        }
    },
    {
        id: 6,
        image: kibibiImg,
        name: "Kamanzi Kibibi Mutagomwa",
        role: "Builder & Site Foreman · Vocational Training Mentor · Canada",
        summary: "Trained as a builder through Jesuit Refugee Service in 2000, Kibibi grew from builder's mate to site foreman — and in 2013 personally trained 10 Hope School graduates on site in Kigali, changing their lives forever.",
        fullStory: {
            intro: "My name is Kamanzi Kibibi Mutagomwa. I was born in the Democratic Republic of Congo and grew up in Gihembe Refugee Camp in Rwanda. Today, I am resettled in Canada, but my journey began in deep poverty. Before learning a skill, my life felt empty — I could not even feed or dress myself properly.",
            sections: [
                {
                    title: "Construction Training Changes Everything",
                    content: "Everything changed in 2000, when Jesuit Refugee Service trained me in construction for six months in Gihembe Refugee Camp. That training transformed my life. By 2005, I began working as a builder on different construction sites. For the first time, I could support myself — and eventually my wife and six children. My wage became the foundation of our survival. I paid school fees, bought cows, and stopped depending on aid. Instead, I began helping others."
                },
                {
                    title: "Training Hope School Graduates",
                    content: "In 2013, while working as a foreman for Eng. Kamanzi Eric on a construction project in Kigali, he approached me with a request that changed many lives. He said, 'Our Hope School graduates are suffering. They finished high school, but they have no jobs and no college opportunity available. Can we bring them to the site and train them?'\n\nI accepted immediately — because I wanted to give back to my community. We rented a house for the students, brought 10 of them to Kigali, and I took responsibility for their training and wellbeing. We taught them the basics — bricklaying, steel fixing, carpentry, concrete work."
                },
                {
                    title: "Poverty Turned into Possibility",
                    content: "Slowly, their confidence grew. After gaining enough skills, we helped them secure jobs across Kigali. Their lives changed. They began supporting their families back in the camp. Poverty turned into possibility.\n\nI am proud that I was part of this journey — and grateful for Eric's vision. What he started in 2013 is exactly what Engineers4Humanity continues today: empowering refugees through practical skills, mentorship, and real employment pathways.\n\nI started as a builder's mate and grew to site foreman and independent sub-contractor. And even now in Canada, the skills I learned continue to sustain me. I have trained many young refugees who are now bricklayers, iron benders, carpenters, welders, electricians, and plumbers."
                },
                {
                    title: "Messages",
                    content: "To refugee youth: Learn a skill. Be patient. Work hard. Your situation does not define your future. I started from the lowest position and grew into a team leader. You can rise too.\n\nTo donors: Vocational training is one of the best ways for social-economic transformation. One toolkit, one training, one opportunity can lift an entire family out of poverty. This is the heart of Engineers4Humanity: Teach a skill. Build dignity. Create self-reliance."
                }
            ]
        }
    },
    {
        id: 7,
        image: muhireImg,
        name: "Muhire Samuel-Claudio",
        role: "Hope School Graduate · Beneficiary of Engineers4Humanity Vocational Training · Currently Living in Finland",
        summary: "Born in DRC, raised in Gihembe Refugee Camp, Samuel's life changed twice — first when Hope School admitted him for free, then when Eng. Kamanzi took him onto a construction site. Today he lives in Finland as a translator.",
        fullStory: {
            intro: "My name is Muhire Samuel, born in the Democratic Republic of Congo in 1996. My family fled to Rwanda due to war in DRC, and I spent my entire childhood in Gihembe Refugee Camp. Life was extremely difficult. When I finished at ordinary level, my education almost ended because my family was too poor to support me.",
            sections: [
                {
                    title: "Hope School Saves His Future",
                    content: "But God opened a door. I was admitted to Hope School, where high school education was free from Senior 4 to Senior 6. Hope School saved my future. The teachers — high school graduates and university students volunteering their time — shaped my discipline, values, and confidence. Later, they even helped me find construction jobs in Kigali so I could survive."
                },
                {
                    title: "Vocational Training in 2013",
                    content: "In 2013, after graduating in History-Economics-Geography, Eng. Kamanzi Eric came to us with a life-changing idea: 'HEG alone will not help you. Come learn practical skills.' He took me and nine other students to his construction site for vocational training. We had no experience, but he believed in us. He trained us, supported us, and gave us a chance. That training became the turning point of my life."
                },
                {
                    title: "From 2,000 to 4,000 Francs a Day",
                    content: "My first job paid 2,000 Rwandan francs a day. After eight months, I was promoted to technician and earned 4,000 francs a day — more than my family received in monthly food assistance. These numbers may seem small, but to a refugee youth in 2013, they meant survival, dignity, and independence. I could pay rent, support myself, and send money home to my mother in the camp."
                },
                {
                    title: "Resettlement to Finland",
                    content: "Eighteen months of construction work changed everything. Eventually, my family and I were selected for resettlement, and today we are living in Finland. I work as a Kinyarwanda and Kiswahili translator, and I hope to finish my studies so I can continue helping my community. But I will never forget where I came from — or who helped me rise."
                },
                {
                    title: "Messages",
                    content: "To refugee youth: Embrace education. Embrace vocational training. These skills will help you survive anywhere in the world. You do not need a master's degree to succeed. A skill can feed you, sustain you, and open doors you never imagined. Work hard. Persevere.\n\nTo Hope School alumni and the global diaspora: Give back. Support Engineers4Humanity. They are continuing the mission that changed my life. Someone invested in me — now it is our turn to invest in the next generation."
                }
            ]
        }
    },
    {
        id: 8,
        image: uwimanaeImg,
        name: "Uwimana Louise",
        role: "Hope School Graduate · Hairdressing & Bakery Technician · Bugesera, Rwanda",
        summary: "An orphan from Gihembe who raised her little sister alone, Louise found her talent in hairdressing at Rwabuye TVET and later excelled in bakery training — becoming a trainer herself. Today she is a proud mother in Bugesera District.",
        fullStory: {
            intro: "My name is Uwimana Louise, and I grew up in Gihembe Refugee Camp as an orphan raising my little sister alone. After graduating from Hope School, I faced the same reality many refugee girls still face today — no job, no opportunities, and no hope. Every day was a struggle to survive.",
            sections: [
                {
                    title: "Hairdressing Training at Rwabuye",
                    content: "Everything changed when Frère Malisaba Straton and Engineers4Humanity gave me an opportunity. I was selected for a three-month vocational training program at Rwabuye Vocational Training Center in Huye. I chose hairdressing — and that is where I discovered my talent and my confidence.\n\nAfter training, I began earning small income as a casual worker. Even without a full toolkit, I managed to support myself and my younger sister."
                },
                {
                    title: "Bakery Training and Recognition",
                    content: "Later, Engineers4Humanity gave me a second chance: bakery training at La Tayole in Kigali. I graduated with excellent performance and was hired to help train the next group of students. That moment gave me dignity. It gave me a future."
                },
                {
                    title: "A New Life",
                    content: "Today, I am a proud mother living in Bugesera District, working with my husband to sustain our family. I am no longer the girl who had nothing — I am a skilled woman, a provider, and a role model in my community.\n\nBut many refugee girls are still where I once was — trapped in unemployment, poverty, and hopelessness. Not because they lack talent, but because they lack opportunity."
                },
                {
                    title: "Messages",
                    content: "To donors and partners: Refugee youth need vocational training, short courses, and toolkits. A simple hairdryer, a pair of scissors, or a baking set can change a girl's life forever. This is not charity — this is sustainable transformation.\n\nTo Hope School Alumni: Let us give back. Engineers4Humanity changed our lives — now it is our turn to lift the next generation.\n\nTo young refugee girls: Do not be afraid. You are capable. Take every opportunity. Your future is bigger than the camp you live in."
                }
            ]
        }
    },
    {
        id: 9,
        image: maniraguhaImg,
        name: "Maniraguha Chance",
        role: "Hairdressing Technician · Engineers4Humanity Vocational Training · Arizona, USA",
        summary: "After completing high school in Gihembe with no job prospects, Chance was selected for hairdressing training through Engineers4Humanity. That one opportunity gave her a career, dignity, and a future — now in Arizona, USA.",
        fullStory: {
            intro: "My name is Maniraguha Chance, and I grew up in Gihembe Refugee Camp, later relocated to Mahama. Today, I am resettled in Arizona, USA, but my journey began in deep hardship. Like many refugee youth, I completed high school with dreams — but no opportunities. After graduation, life became a cycle of unemployment, poverty, and hopelessness. You depend on your parents, yet they have nothing to give.",
            sections: [
                {
                    title: "One Opportunity Changes Everything",
                    content: "But everything changed when Frère Malisaba Straton and Engineers4Humanity gave me a chance. I was selected for vocational training in hairdressing at Rwabuye Vocational Training Center. I never imagined this path, but that opportunity transformed my life."
                },
                {
                    title: "Skill, Career, and Dignity",
                    content: "I gained skill, a career, and dignity. Hairdressing became my daily work. I earned a living, supported myself, and helped my mother and siblings. I no longer depended on my family — I supported them in the refugee camp."
                },
                {
                    title: "From Rwanda to Arizona",
                    content: "Even now in Arizona, the skills I learned in Rwanda continue to sustain me. They gave me confidence, independence, and a future.\n\nBut many refugee youths still face huge challenges — no toolkits, no start-up capital, no equipment, and no opportunities to grow. A simple hair clipper or dryer can change a young refugee's life forever."
                },
                {
                    title: "Messages",
                    content: "To refugee youth: Stop drugs. Take education seriously. Believe in yourself. Work hard. Your situation does not define your ability.\n\nI am deeply grateful to Frère Malisaba and to Eric, our brother and role model, whose support and leadership continue to lift refugee youth.\n\nTo donors: Please support vocational training and toolkits. One opportunity can change a life — I am living proof.\n\nTo fellow refugees: never give up. You did not choose to be a refugee, but you can choose your future."
                }
            ]
        }
    },
    {
        id: 10,
        image: mukeshimanaImg,
        name: "Mukeshimana Angelique",
        role: "Congolese Refugee · Nyabiheke Refugee Camp · Construction Trainee · Youth Advocate for Girls' Empowerment",
        summary: "One of the few girls in Nyabiheke to receive construction training, Angelique proved culture wrong — earning income, supporting her family, and inspiring other young women that what boys can do, girls can do too.",
        fullStory: {
            intro: "My name is Mukeshimana Angelique, a Congolese refugee living in Nyabiheke Refugee Camp. Refugee life is extremely difficult — we live in poverty, we depend on limited food assistance, and most of the time, what we receive cannot meet even our basic needs. For young people, especially girls, the challenges are even heavier.",
            sections: [
                {
                    title: "The Reality for Refugee Girls",
                    content: "In Nyabiheke, many youth finish high school, but after graduation they stay at home because there are no jobs. Without college or vocational training, we cannot compete in the job market. Refugee girls face even deeper struggles — during our monthly periods, we lack sanitary pads, clean water, and privacy. Poverty pushes some girls into dangerous situations, not because they want to — but because they have no choice."
                },
                {
                    title: "Construction Skills Break the Mold",
                    content: "I am one of the few girls who received an opportunity. I learned construction skills, and that changed my life. Whenever there is construction work in the camp, I am hired. I earn money that helps me and my mother. I buy clothes, shoes, and food. I even pay school fees for my younger brother. My job gave me dignity and independence."
                },
                {
                    title: "Proving Culture Wrong",
                    content: "But being a girl in construction is not easy. Many people believe girls cannot do this work — that it is 'against culture.' But I proved them wrong. What boys can do, girls can do too. We only need someone to believe in us and give us a chance.\n\nMy contribution to my family and community is big. When I work, I reduce unemployment. I support my siblings. I inspire other girls. I show them that a refugee girl can rise."
                },
                {
                    title: "Messages",
                    content: "To refugee youth: Believe in yourselves. Work hard. Join cooperatives. Support each other. Poverty is heavy, but together we can overcome it.\n\nTo donors and partners: Please support refugee youth — especially girls. We need scholarships, vocational training, and financial support for small cooperatives. Your help can protect girls from exploitation and give them a future.\n\nThis is why the work of Engineers4Humanity is so important — they give youth skills, dignity, and real opportunities to escape poverty."
                }
            ]
        }
    },
    {
        id: 11,
        image: mukamutaraImg,
        name: "Mukamutara Alvera",
        role: "Widow · Refugee Mother · Beneficiary of Engineers4Humanity Education Support · Mahama Refugee Camp",
        summary: "A widow with no income and no education, Alvera received a life-changing call — Engineers4Humanity was looking for children with no support to continue high school. Her son completed his education and now supports the entire family.",
        fullStory: {
            intro: "My name is Mukamutara Alvera, a widow and refugee mother who lived in Gihembe and now in Mahama Refugee Camp. Life in the camp is extremely difficult — poverty follows us every day, and as a mother with no education and no job, you feel powerless to change your children's future.",
            sections: [
                {
                    title: "The Miracle Call",
                    content: "But one day, God sent me a miracle through Frère Malisaba and Engineers4Humanity. I received a call from Bahati Justine (Mama Condifa) telling me that someone was looking for children who had no support to continue high school. In that moment, hope rose inside me. I felt that God had remembered my family."
                },
                {
                    title: "A Son's Transformation",
                    content: "Because of Engineers4Humanity, my son completed high school in Construction. Today, he is earning money as a young technician. He supports himself. He supports me. He supports his siblings.\n\nThis is what opportunity does — it transforms a family."
                },
                {
                    title: "The Reality of Camp Life",
                    content: "Life in the refugee camp remains hard. We depend on the small monthly support from the World Food Programme, which finishes in two weeks. As refugee women, getting a job is almost impossible. We rely on group savings just to buy clothes for our children. We face poverty, overcrowding, food insecurity, and limited opportunities.\n\nThis is why the work of Engineers4Humanity is so important. Education and vocational training are the tools that break the cycle of poverty."
                },
                {
                    title: "Messages",
                    content: "I am grateful to the Government of Rwanda, UNHCR, and all donors who support us. But until peace returns to the Democratic Republic of Congo, we need continued support to live with dignity.\n\nTo donors: Please continue supporting refugee education and vocational training. Your help does not only change one life — it transforms generations.\n\nTo refugee youth: Do not lose hope. Work hard. Be disciplined. Take every opportunity. And when you succeed, give back to your community."
                }
            ]
        }
    },
    {
        id: 12,
        image: nuwayoImg,
        name: "Nuwayo Gahindo",
        role: "Parent & Beneficiary of Hope School · Arizona, USA · Advocate for Refugee Education & Vocational Training",
        summary: "A Hope School parent who contributed food rations to keep the school alive, Nuwayo saw three children graduate and learned to read and write herself through the school's evening program. Now in Arizona, her advocacy continues.",
        fullStory: {
            intro: "My name is Nuwayo Gahindo, now living in Arizona, USA, and I am one of the parents and beneficiaries of Hope School in Gihembe Refugee Camp. Hope School was not just a school — it was a lifeline, created by refugees for refugees. It was built through unity, sacrifice, and the courage of our youth from the Forum.",
            sections: [
                {
                    title: "Parents Giving Food Rations for Education",
                    content: "I remember when we parents agreed to give a portion of our food rations so our children could have school materials and teachers could receive a small incentive. We gave with pride because we believed in our children — and Hope School proved us right.\n\nEvery child who sat for national exams passed. Hope School protected our youth from drug abuse, hopelessness, and idleness. It gave them purpose and a future."
                },
                {
                    title: "Three Graduates and Personal Growth",
                    content: "Three of my own children graduated from Hope School, and today they have occupations because of the foundation they received there. Hope School even changed my life — I attended the evening literacy program and learned to read and write for the first time. That gave me dignity as a mother."
                },
                {
                    title: "Continuing Challenges",
                    content: "Life in the refugee camp remains extremely difficult — poverty, overcrowding, lack of energy, limited water, and no access to higher education or vocational tools. Refugee youth, especially girls and women, need skills, toolkits, and start-up capital to build their future.\n\nI am grateful that one of my sons received vocational training through the support of Frère Malisaba and Engineers4Humanity. Today, he sustains himself, supports me, and has dignity. This is what vocational training can do."
                },
                {
                    title: "Messages",
                    content: "To donors: Please continue supporting refugee education, vocational training, toolkits, and women's empowerment. This is not charity — this is empowerment.\n\nTo refugee youth: Be strong, work hard, be thankful, and give back to your community. You did not choose to be a refugee — but you can choose your future."
                }
            ]
        }
    },
    {
        id: 13,
        image: jeanDeDieuImg,
        name: "Jean de Dieu Dusabimana",
        role: "Congolese Refugee · Nyabiheke Refugee Camp · Plumber · Member of Refugee Technicians Association",
        summary: "Living in Nyabiheke on less than $5/month in food aid, Jean learned plumbing and changed his life. Now he earns wages on construction sites, supports his family, and advocates loudly for refugee youth to access technical jobs.",
        fullStory: {
            intro: "My name is Jean de Dieu Dusabimana, a Congolese refugee living in Nyabiheke Refugee Camp. Life as a refugee is extremely difficult — especially when you do not have a job. Many people here survive only on food assistance from the World Food Programme, which is now less than $5 per month per person. You cannot live on that. Poverty becomes a daily battle.",
            sections: [
                {
                    title: "Plumbing Skills Change His Life",
                    content: "Before I learned plumbing, my life was the same. I had no income and no hope. But when I gained plumbing skills, everything changed. Today, I work on different construction sites as a casual plumber. The jobs are not permanent, but they give me income. I can buy clothes, shoes, and food for my children. I support my family with dignity."
                },
                {
                    title: "Skills Speak Louder Than Status",
                    content: "Sometimes employers hesitate when they see my refugee ID — but when they test my skills, they hire me because I am competent. Skills speak louder than status."
                },
                {
                    title: "Barriers Facing Refugee Youth",
                    content: "But not all refugee youth are as lucky. Most remain unemployed because there are very few job opportunities in the camp, many jobs are given to Rwandan citizens, refugees struggle to obtain ID documents, and youth have no access to college or university.\n\nThis is why I call on UNHCR, the Government of Rwanda, and contractors: Give more construction and technical jobs to refugees. We are capable. We have skills. We deserve the chance to work and support our families.\n\nVocational training changed my life — and it can change thousands more. Many technicians in our camp now earn enough to invest in agriculture, rent farmland, and reduce their dependence on aid. Skills create dignity. Skills create independence. Skills create hope."
                },
                {
                    title: "Messages",
                    content: "To refugee youth: Join vocational training. Join our technicians' association. Do not wait for donations — they will keep you in poverty forever. With skills, you can work anywhere and build a better future.\n\nTo donors: We need more organizations like Engineers4Humanity to change the life of our community."
                }
            ]
        }
    },
];

const Testimony = () => {
    const [selectedStory, setSelectedStory] = useState<any>(null);
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const el = document.getElementById(location.hash.slice(1));
            if (el) {
                setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
            }
        }
    }, [location.hash]);

    const StoryModal = ({ story, onClose }: any) => {
        if (!story) return null;
        return (
            <div className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4 overflow-y-auto">
                <div className="bg-white rounded-2xl max-w-4xl w-full my-8 relative max-h-[90vh] overflow-y-auto">
                    <button
                        onClick={onClose}
                        className="sticky top-4 float-right mr-4 mt-4 bg-gray-900 text-white p-2 rounded-full hover:bg-gray-700 transition z-10"
                    >
                        <X className="w-6 h-6" />
                    </button>
                    <div className="p-8">
                        <div className="flex items-center gap-6 mb-8">
                            <img src={story.image} alt={story.name} className="w-32 h-32 rounded-full object-cover object-top border-4 border-sky-600" />
                            <div>
                                <h2 className="font-serif text-3xl font-bold text-gray-900 mb-2">{story.name}</h2>
                                <p className="text-sky-600 font-semibold text-lg">{story.role}</p>
                            </div>
                        </div>
                        <div className="prose prose-lg max-w-none">
                            <div className="bg-gray-50 p-6 rounded-xl mb-8 border-l-4 border-sky-600">
                                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{story.fullStory.intro}</p>
                            </div>
                            {story.fullStory.sections.map((section: any, index: number) => (
                                <div key={index} className="mb-8">
                                    <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <Sparkles className="w-6 h-6 text-sky-600" />
                                        {section.title}
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">{section.content}</p>
                                </div>
                            ))}
                            <div className="mt-8 pt-8 border-t-2 border-gray-200">
                                <p className="text-right font-serif text-xl italic text-gray-600">— {story.name}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="font-sans text-gray-800">
            <Header
                title="Testimonials"
                linkTitle="Testimonials"
                linkHref="/impact/testimony"
                backgroundImage={image}
            />

            <section id="testimony" className="py-12 md:py-20 bg-white scroll-mt-24">
                <div className=" mx-auto px-4 sm:px-6">
                    <div className="text-center mb-10 md:mb-16">
                        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 md:mb-6">
                            <Award className="w-10 h-10 sm:w-12 sm:h-12 text-sky-600" />
                            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
                                Read Their Stories
                            </h2>
                        </div>
                        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                            Click on any profile below to read the full testimony in their own words.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                        {testimonies.map((story) => (
                            <div
                                key={story.id}
                                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-sky-600"
                            >
                                <div className="h-48 sm:h-56 md:h-64 overflow-hidden">
                                    <img
                                        src={story.image}
                                        alt={story.name}
                                        className="w-full h-full object-cover object-top hover:scale-110 transition-transform duration-300"
                                    />
                                </div>
                                <div className="p-4 sm:p-6">
                                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-gray-900 mb-2">{story.name}</h3>
                                    <p className="text-sky-600 font-semibold mb-4 text-sm leading-snug">{story.role}</p>
                                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 sm:mb-6 line-clamp-3">
                                        {story.summary}
                                    </p>
                                    <button
                                        onClick={() => setSelectedStory(story)}
                                        className="w-full bg-gradient-to-r from-sky-600 to-green-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:from-sky-700 hover:to-green-700 transition-all flex items-center justify-center gap-2"
                                    >
                                        View Full Story
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 md:py-20 bg-gradient-to-br from-sky-600 to-green-600 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                        Be Part of the Story
                    </h2>
                    <p className="text-lg md:text-xl opacity-95 mb-8">
                        Your support helps us continue transforming lives through education, engineering, and peace-building.
                    </p>
                    <a
                        href="/donate"
                        className="inline-block bg-white text-sky-600 px-8 md:px-10 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl no-underline"
                    >
                        Donate Now
                    </a>
                </div>
            </section>

            {selectedStory && (
                <StoryModal story={selectedStory} onClose={() => setSelectedStory(null)} />
            )}

            <style>{`
                .font-serif { font-family: 'Playfair Display', serif; }
                .font-sans { font-family: 'DM Sans', sans-serif; }
                .line-clamp-3 {
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </div>
    );
};

export default Testimony;
