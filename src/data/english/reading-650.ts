import { ReadingPassage } from './types';

export const readingPassages650: ReadingPassage[] = [
  {
    id: 1,
    title: 'Office Relocation Notice',
    passage: `Dear All Employees,

We are pleased to announce that our company will be relocating to a new office building at 500 Park Avenue, effective March 15. The new facility offers modern meeting rooms, a larger cafeteria, and improved parking. All departments will move during the weekend of March 13-14 to minimize disruption to daily operations. Please pack your personal belongings in the boxes provided by the facilities team no later than March 12. IT staff will handle the transfer of computers and equipment. Temporary access cards for the new building will be distributed on March 10. If you have any questions regarding the move, please contact the Facilities Department at extension 4520. We look forward to welcoming everyone to our new workspace.

Best regards,
Human Resources Department`,
    level: 650,
    category: 'notice',
    questions: [
      {
        id: 1,
        question: 'What is the purpose of this notice?',
        choices: [
          'To announce a company merger',
          'To inform employees about an office relocation',
          'To introduce a new employee benefit',
          'To describe a renovation project'
        ],
        answer: 1,
        explanation: '通知の冒頭で会社が新しいオフィスビルに移転することが述べられています。'
      },
      {
        id: 2,
        question: 'When should employees pack their personal belongings?',
        choices: [
          'By March 10',
          'By March 12',
          'By March 13',
          'By March 15'
        ],
        answer: 1,
        explanation: '「no later than March 12」と記載されており、3月12日までに荷造りする必要があります。'
      },
      {
        id: 3,
        question: 'Who will transfer computers and equipment?',
        choices: [
          'Each employee individually',
          'The Human Resources Department',
          'The IT staff',
          'An external moving company'
        ],
        answer: 2,
        explanation: '「IT staff will handle the transfer of computers and equipment」と記載されています。'
      },
      {
        id: 4,
        question: 'What does the word "disruption" most likely mean in this context?',
        choices: [
          'Improvement',
          'Interruption',
          'Organization',
          'Communication'
        ],
        answer: 1,
        explanation: '「disruption」は「中断・混乱」を意味し、日常業務への影響を最小限にするという文脈で使われています。'
      },
      {
        id: 5,
        question: 'What can be inferred about the new office?',
        choices: [
          'It is smaller than the current office',
          'It does not have a parking area',
          'It offers better facilities than the current office',
          'It is located in the same building'
        ],
        answer: 2,
        explanation: '新しいオフィスにはモダンな会議室、広いカフェテリア、改善された駐車場があると述べられており、現在のオフィスより施設が充実していることが推測できます。'
      }
    ]
  },
  {
    id: 2,
    title: 'Product Launch Email',
    passage: `Subject: Exciting New Product Launch – SmartDesk Pro

Dear Sales Team,

I am thrilled to inform you that we will officially launch the SmartDesk Pro on April 1. This ergonomic standing desk features an electric height adjustment system, built-in wireless charging, and an integrated cable management tray. Market research indicates strong demand among remote workers and corporate offices.

The retail price will be $899, with an introductory discount of 15% for the first month. Sales training sessions will be held on March 25 and 26 in Conference Room B. Product samples will be available for demonstration starting March 28.

Please review the attached product specifications and prepare your client presentations. Each sales representative is expected to contact at least 20 potential customers by April 5.

Thank you for your continued dedication.

Best,
Jennifer Walsh
VP of Sales`,
    level: 650,
    category: 'business email',
    questions: [
      {
        id: 1,
        question: 'What is the main purpose of this email?',
        choices: [
          'To request feedback on a new product',
          'To announce a product launch and prepare the sales team',
          'To report quarterly sales figures',
          'To invite employees to a company event'
        ],
        answer: 1,
        explanation: 'メールは新製品SmartDesk Proの発売を知らせ、セールスチームに準備を促す内容です。'
      },
      {
        id: 2,
        question: 'What is the introductory price of the SmartDesk Pro?',
        choices: [
          '$899.00',
          '$764.15',
          '$750.00',
          '$1,000.00'
        ],
        answer: 1,
        explanation: '定価$899から15%割引をすると$764.15になります。introductory discountが適用された価格です。'
      },
      {
        id: 3,
        question: 'When will product samples be available?',
        choices: [
          'March 25',
          'March 26',
          'March 28',
          'April 1'
        ],
        answer: 2,
        explanation: '「Product samples will be available for demonstration starting March 28」と記載されています。'
      },
      {
        id: 4,
        question: 'What does the word "thrilled" most likely mean?',
        choices: [
          'Worried',
          'Very excited',
          'Surprised',
          'Confused'
        ],
        answer: 1,
        explanation: '「thrilled」は「とても興奮している・ワクワクしている」という意味で、良いニュースを伝える文脈で使われています。'
      },
      {
        id: 5,
        question: 'How many potential customers should each representative contact?',
        choices: [
          'At least 10',
          'At least 15',
          'At least 20',
          'At least 25'
        ],
        answer: 2,
        explanation: '「at least 20 potential customers by April 5」と明記されています。'
      }
    ]
  },
  {
    id: 3,
    title: 'Hotel Guest Notice',
    passage: `Welcome to the Grand Pacific Hotel!

We hope you enjoy your stay with us. Please note the following information for your convenience:

Breakfast is served daily from 6:30 AM to 10:00 AM in the Sunrise Restaurant on the second floor. Room service is available 24 hours a day. The outdoor swimming pool is open from 7:00 AM to 9:00 PM and towels are provided poolside.

Complimentary Wi-Fi is available throughout the hotel. To connect, select "GrandPacific_Guest" and enter your room number as the password. The fitness center on the fifth floor is open to all guests at no additional charge.

Checkout time is 11:00 AM. Late checkout until 2:00 PM may be arranged at the front desk for a fee of $30. If you need any assistance during your stay, please dial 0 from your room phone.

Thank you for choosing the Grand Pacific Hotel.`,
    level: 650,
    category: 'notice',
    questions: [
      {
        id: 1,
        question: 'Where is the Sunrise Restaurant located?',
        choices: [
          'On the first floor',
          'On the second floor',
          'On the fifth floor',
          'Next to the swimming pool'
        ],
        answer: 1,
        explanation: '「the Sunrise Restaurant on the second floor」と記載されています。'
      },
      {
        id: 2,
        question: 'What is the Wi-Fi password?',
        choices: [
          'GrandPacific_Guest',
          'The guest\'s name',
          'The guest\'s room number',
          'There is no password required'
        ],
        answer: 2,
        explanation: '「enter your room number as the password」と記載されており、部屋番号がパスワードです。'
      },
      {
        id: 3,
        question: 'What can be inferred about the fitness center?',
        choices: [
          'It requires a membership fee',
          'It is included in the room rate',
          'It is located next to the pool',
          'It is only open in the morning'
        ],
        answer: 1,
        explanation: '「open to all guests at no additional charge」とあるので、宿泊料金に含まれていると推測できます。'
      },
      {
        id: 4,
        question: 'How much does late checkout cost?',
        choices: [
          '$20',
          '$25',
          '$30',
          '$50'
        ],
        answer: 2,
        explanation: '「Late checkout until 2:00 PM may be arranged at the front desk for a fee of $30」と記載されています。'
      },
      {
        id: 5,
        question: 'What does the word "complimentary" mean in this context?',
        choices: [
          'Expensive',
          'Limited',
          'Free of charge',
          'High-speed'
        ],
        answer: 2,
        explanation: '「complimentary」は「無料の」という意味で、Wi-Fiが無料で利用できることを示しています。'
      }
    ]
  },
  {
    id: 4,
    title: 'Job Advertisement',
    passage: `Marketing Coordinator – Full-Time Position

Greenfield Industries is seeking an experienced Marketing Coordinator to join our growing team. The successful candidate will be responsible for managing social media accounts, coordinating marketing campaigns, and assisting with event planning.

Requirements:
- Bachelor's degree in Marketing, Communications, or a related field
- Minimum 2 years of experience in a marketing role
- Strong written and verbal communication skills
- Proficiency in Adobe Creative Suite and social media platforms
- Ability to work independently and meet tight deadlines

We offer a competitive salary ranging from $50,000 to $60,000 per year, comprehensive health insurance, 15 days of paid vacation, and professional development opportunities. The position is based at our downtown headquarters, with the option to work remotely two days per week.

To apply, please submit your resume and cover letter to careers@greenfield.com by April 20.`,
    level: 650,
    category: 'advertisement',
    questions: [
      {
        id: 1,
        question: 'What is the minimum experience required for this position?',
        choices: [
          '1 year',
          '2 years',
          '3 years',
          '5 years'
        ],
        answer: 1,
        explanation: '「Minimum 2 years of experience in a marketing role」と記載されています。'
      },
      {
        id: 2,
        question: 'Which of the following is NOT mentioned as a job responsibility?',
        choices: [
          'Managing social media accounts',
          'Coordinating marketing campaigns',
          'Analyzing financial reports',
          'Assisting with event planning'
        ],
        answer: 2,
        explanation: '財務レポートの分析は職務内容として挙げられていません。'
      },
      {
        id: 3,
        question: 'How often can employees work from home?',
        choices: [
          'Every day',
          'One day per week',
          'Two days per week',
          'Three days per week'
        ],
        answer: 2,
        explanation: '「the option to work remotely two days per week」と記載されています。'
      },
      {
        id: 4,
        question: 'What does "proficiency" mean in this context?',
        choices: [
          'Basic knowledge',
          'A high level of skill',
          'Certification',
          'Interest'
        ],
        answer: 1,
        explanation: '「proficiency」は「習熟・高い技能」を意味し、Adobe Creative Suiteに精通していることが求められています。'
      },
      {
        id: 5,
        question: 'What can be inferred about Greenfield Industries?',
        choices: [
          'It is a small startup company',
          'It is reducing its workforce',
          'It is expanding its operations',
          'It only hires entry-level employees'
        ],
        answer: 2,
        explanation: '「our growing team」という表現から、会社が事業を拡大していることが推測できます。'
      }
    ]
  },
  {
    id: 5,
    title: 'Company Memo: New Expense Policy',
    passage: `MEMORANDUM

To: All Department Managers
From: Linda Chen, Chief Financial Officer
Date: February 10
Subject: Updated Travel and Expense Policy

Effective March 1, the company will implement a revised travel and expense policy. The key changes are as follows:

All business travel must be approved by a department manager at least five business days before the trip. Domestic flights should be booked through our designated travel agency, Corporate Travel Solutions. Hotel accommodations are limited to $180 per night for domestic travel and $250 per night for international travel.

Meal expenses will be reimbursed up to $60 per day for domestic trips and $80 per day for international trips. Original receipts must be submitted within 10 business days of returning from the trip.

Employees who fail to follow these guidelines may not receive reimbursement. Please share this information with your teams and ensure compliance.`,
    level: 650,
    category: 'memo',
    questions: [
      {
        id: 1,
        question: 'Who wrote this memorandum?',
        choices: [
          'A department manager',
          'The CEO',
          'The Chief Financial Officer',
          'The Human Resources Director'
        ],
        answer: 2,
        explanation: '「From: Linda Chen, Chief Financial Officer」と記載されています。'
      },
      {
        id: 2,
        question: 'How far in advance must business travel be approved?',
        choices: [
          'At least 3 business days',
          'At least 5 business days',
          'At least 7 business days',
          'At least 10 business days'
        ],
        answer: 1,
        explanation: '「at least five business days before the trip」と記載されています。'
      },
      {
        id: 3,
        question: 'What is the maximum daily meal expense for international trips?',
        choices: [
          '$50',
          '$60',
          '$70',
          '$80'
        ],
        answer: 3,
        explanation: '「$80 per day for international trips」と記載されています。'
      },
      {
        id: 4,
        question: 'What does the word "compliance" mean in this context?',
        choices: [
          'Agreement with a suggestion',
          'Following rules or guidelines',
          'Making a complaint',
          'Providing financial support'
        ],
        answer: 1,
        explanation: '「compliance」は「規則に従うこと・遵守」を意味し、新しいポリシーに従うことを求めています。'
      },
      {
        id: 5,
        question: 'What happens if an employee does not follow the new policy?',
        choices: [
          'They will receive a written warning',
          'They may not be reimbursed',
          'They will be transferred to another department',
          'They must attend a training session'
        ],
        answer: 1,
        explanation: '「Employees who fail to follow these guidelines may not receive reimbursement」と記載されています。'
      }
    ]
  },
  {
    id: 6,
    title: 'Technology Article',
    passage: `Cloud Computing Transforms Small Businesses

A recent study by the National Business Association found that 72% of small businesses in the country now use cloud-based services, up from just 45% three years ago. Cloud computing allows companies to store data, run applications, and manage resources over the internet instead of relying on local servers.

The primary benefits include cost savings, as businesses no longer need to invest heavily in hardware and maintenance. Additionally, cloud services provide flexibility, enabling employees to access files and tools from any location with an internet connection. This has been especially valuable as more companies adopt remote work arrangements.

However, experts warn that businesses should carefully evaluate security measures when choosing a cloud provider. Data breaches remain a significant concern, and companies must ensure their provider offers encryption, regular backups, and strong access controls. Despite these challenges, the trend toward cloud adoption shows no signs of slowing down.`,
    level: 650,
    category: 'article',
    questions: [
      {
        id: 1,
        question: 'What percentage of small businesses currently use cloud services?',
        choices: [
          '45%',
          '55%',
          '65%',
          '72%'
        ],
        answer: 3,
        explanation: '「72% of small businesses in the country now use cloud-based services」と記載されています。'
      },
      {
        id: 2,
        question: 'What is mentioned as a primary benefit of cloud computing?',
        choices: [
          'Faster internet speeds',
          'Cost savings on hardware and maintenance',
          'Better employee recruitment',
          'Reduced need for internet access'
        ],
        answer: 1,
        explanation: '「cost savings, as businesses no longer need to invest heavily in hardware and maintenance」と記載されています。'
      },
      {
        id: 3,
        question: 'What concern do experts have about cloud computing?',
        choices: [
          'It is too expensive for small businesses',
          'It requires too much training',
          'Data security and breaches',
          'It slows down business operations'
        ],
        answer: 2,
        explanation: '専門家はクラウドプロバイダーのセキュリティ対策を慎重に評価すべきだと警告しており、データ侵害が大きな懸念事項として挙げられています。'
      },
      {
        id: 4,
        question: 'What does "adopt" mean in the context of "adopt remote work arrangements"?',
        choices: [
          'To take care of',
          'To begin using or following',
          'To reject',
          'To modify slightly'
        ],
        answer: 1,
        explanation: '「adopt」はここでは「採用する・取り入れる」という意味で、リモートワークを導入することを指しています。'
      }
    ]
  },
  {
    id: 7,
    title: 'Restaurant Review',
    passage: `The Blue Olive – A Delightful Dining Experience

Located on the corner of Fifth Street and Oak Avenue, The Blue Olive has quickly become one of the most popular restaurants in the city since opening six months ago. The restaurant specializes in Mediterranean cuisine, offering a wide selection of fresh seafood, grilled meats, and vegetarian dishes.

During my visit last Saturday evening, I was impressed by the warm atmosphere and attentive service. Our waiter, Marco, was knowledgeable about the menu and made excellent recommendations. I ordered the grilled salmon with roasted vegetables, which was perfectly seasoned and beautifully presented. My dining companion chose the lamb kebab, which she described as tender and flavorful.

The only drawback was the wait time. We arrived without a reservation and had to wait 45 minutes for a table. I would strongly recommend making a reservation, especially on weekends. Overall, The Blue Olive offers outstanding food at reasonable prices, and I will certainly return.`,
    level: 650,
    category: 'article',
    questions: [
      {
        id: 1,
        question: 'How long has The Blue Olive been open?',
        choices: [
          'Three months',
          'Six months',
          'One year',
          'Two years'
        ],
        answer: 1,
        explanation: '「since opening six months ago」と記載されています。'
      },
      {
        id: 2,
        question: 'What type of cuisine does the restaurant serve?',
        choices: [
          'Japanese',
          'Mexican',
          'Mediterranean',
          'French'
        ],
        answer: 2,
        explanation: '「The restaurant specializes in Mediterranean cuisine」と記載されています。'
      },
      {
        id: 3,
        question: 'What was the reviewer\'s main complaint?',
        choices: [
          'The food quality',
          'The prices',
          'The wait time for a table',
          'The service'
        ],
        answer: 2,
        explanation: '「The only drawback was the wait time」と述べられており、予約なしで45分待ったことが唯一の不満点でした。'
      },
      {
        id: 4,
        question: 'What does the word "attentive" mean in this context?',
        choices: [
          'Slow and careless',
          'Paying close attention to guests\' needs',
          'Overly strict',
          'Unfriendly'
        ],
        answer: 1,
        explanation: '「attentive」は「注意深い・気配りのある」という意味で、サービスが行き届いていたことを示しています。'
      },
      {
        id: 5,
        question: 'What can be inferred from this review?',
        choices: [
          'The restaurant is not worth visiting',
          'The restaurant is popular and often crowded',
          'The restaurant is very expensive',
          'The reviewer did not enjoy the food'
        ],
        answer: 1,
        explanation: '予約なしだと45分待つ必要があることから、レストランが人気で混雑していることが推測できます。'
      }
    ]
  },
  {
    id: 8,
    title: 'Workshop Registration',
    passage: `Professional Development Workshop Series

The Human Resources Department is pleased to announce our spring workshop series, designed to help employees enhance their professional skills.

Workshop 1: Effective Presentation Skills
Date: April 8, 9:00 AM – 12:00 PM
Instructor: Dr. Sarah Mitchell
This hands-on workshop will teach you how to create engaging presentations and deliver them with confidence.

Workshop 2: Time Management and Productivity
Date: April 15, 1:00 PM – 4:00 PM
Instructor: Kevin Park
Learn proven techniques to prioritize tasks, manage your schedule, and increase daily productivity.

Workshop 3: Conflict Resolution in the Workplace
Date: April 22, 9:00 AM – 12:00 PM
Instructor: Maria Santos
Develop strategies for handling disagreements professionally and maintaining positive working relationships.

Registration is limited to 25 participants per workshop. To sign up, visit the HR portal or email workshops@company.com. The deadline for registration is March 31. These workshops are free for all full-time employees.`,
    level: 650,
    category: 'notice',
    questions: [
      {
        id: 1,
        question: 'How many workshops are being offered?',
        choices: [
          'Two',
          'Three',
          'Four',
          'Five'
        ],
        answer: 1,
        explanation: '3つのワークショップが提供されています。'
      },
      {
        id: 2,
        question: 'Who will teach the Time Management workshop?',
        choices: [
          'Dr. Sarah Mitchell',
          'Kevin Park',
          'Maria Santos',
          'The HR Director'
        ],
        answer: 1,
        explanation: 'Workshop 2のインストラクターとしてKevin Parkが記載されています。'
      },
      {
        id: 3,
        question: 'What is the maximum number of participants per workshop?',
        choices: [
          '15',
          '20',
          '25',
          '30'
        ],
        answer: 2,
        explanation: '「Registration is limited to 25 participants per workshop」と記載されています。'
      },
      {
        id: 4,
        question: 'What can be inferred about the workshops?',
        choices: [
          'They are mandatory for all employees',
          'They are only for managers',
          'They are popular and may fill up quickly',
          'They require a fee to attend'
        ],
        answer: 2,
        explanation: '参加者数が25名に制限されていることから、定員に達する可能性があり、人気があることが推測できます。'
      },
      {
        id: 5,
        question: 'When is the registration deadline?',
        choices: [
          'March 25',
          'March 31',
          'April 1',
          'April 8'
        ],
        answer: 1,
        explanation: '「The deadline for registration is March 31」と記載されています。'
      }
    ]
  },
  {
    id: 9,
    title: 'Gym Membership Advertisement',
    passage: `FitLife Gym – Spring Membership Special!

Are you looking to get in shape this spring? FitLife Gym is offering an exclusive membership deal for new members who sign up before April 30.

Standard Membership: $39/month
- Access to all cardio and weight training equipment
- Free group fitness classes (yoga, spinning, aerobics)
- Locker room and shower facilities

Premium Membership: $59/month
- All Standard Membership benefits
- Unlimited personal training sessions (twice per week)
- Access to the indoor swimming pool and sauna
- Free protein shakes at the juice bar

Sign up during our spring promotion and receive 50% off your first two months! No enrollment fee for the first 100 members to join.

FitLife Gym is conveniently located at 320 Riverside Drive, with free parking available. Our facilities are open Monday through Friday from 5:00 AM to 11:00 PM and on weekends from 7:00 AM to 9:00 PM.

Visit www.fitlifegym.com or call (555) 890-1234 to schedule a free tour.`,
    level: 650,
    category: 'advertisement',
    questions: [
      {
        id: 1,
        question: 'What is included in the Standard Membership?',
        choices: [
          'Personal training sessions',
          'Access to the swimming pool',
          'Free group fitness classes',
          'Free protein shakes'
        ],
        answer: 2,
        explanation: 'Standard Membershipには「Free group fitness classes」が含まれています。'
      },
      {
        id: 2,
        question: 'How much is the Premium Membership normally per month?',
        choices: [
          '$29',
          '$39',
          '$49',
          '$59'
        ],
        answer: 3,
        explanation: '「Premium Membership: $59/month」と記載されています。'
      },
      {
        id: 3,
        question: 'What is the spring promotion offer?',
        choices: [
          'Free membership for the first month',
          '25% off for three months',
          '50% off the first two months',
          'A free personal trainer for one month'
        ],
        answer: 2,
        explanation: '「receive 50% off your first two months」と記載されています。'
      },
      {
        id: 4,
        question: 'When does the gym close on Saturdays?',
        choices: [
          '9:00 PM',
          '10:00 PM',
          '11:00 PM',
          'It is closed on Saturdays'
        ],
        answer: 0,
        explanation: '「on weekends from 7:00 AM to 9:00 PM」と記載されており、土曜日は9:00 PMに閉まります。'
      },
      {
        id: 5,
        question: 'What can be inferred about the enrollment fee?',
        choices: [
          'There is no enrollment fee for anyone',
          'The enrollment fee is $39',
          'Only the first 100 members avoid the fee',
          'The fee is waived for Premium members only'
        ],
        answer: 2,
        explanation: '「No enrollment fee for the first 100 members to join」とあるので、最初の100名のみ入会費が免除されることがわかります。'
      }
    ]
  },
  {
    id: 10,
    title: 'Shipping Delay Email',
    passage: `Subject: Update on Your Order #78432

Dear Ms. Thompson,

Thank you for your recent order with Grandview Electronics. We are writing to inform you that there will be a slight delay in the shipment of your order.

Due to unexpected high demand for the WaveSound Bluetooth Speaker you ordered, our warehouse is currently out of stock. We expect to receive a new shipment from our supplier by March 20. Your order will be processed and shipped within two business days after that date. The estimated delivery date is now March 25, instead of the originally scheduled March 15.

We sincerely apologize for any inconvenience this may cause. As a gesture of goodwill, we are offering you a 10% discount on your next purchase. A coupon code will be sent to your email once your current order has been shipped.

If you would prefer to cancel your order for a full refund, please contact our customer service team at support@grandviewelectronics.com or call 1-800-555-0192.

We appreciate your patience and understanding.

Regards,
Customer Service Team
Grandview Electronics`,
    level: 650,
    category: 'business email',
    questions: [
      {
        id: 1,
        question: 'Why is the order delayed?',
        choices: [
          'The payment has not been processed',
          'The product is out of stock due to high demand',
          'The shipping company is on strike',
          'The customer provided the wrong address'
        ],
        answer: 1,
        explanation: '「Due to unexpected high demand... our warehouse is currently out of stock」と記載されています。'
      },
      {
        id: 2,
        question: 'When is the new estimated delivery date?',
        choices: [
          'March 15',
          'March 20',
          'March 22',
          'March 25'
        ],
        answer: 3,
        explanation: '「The estimated delivery date is now March 25」と記載されています。'
      },
      {
        id: 3,
        question: 'What compensation is being offered to the customer?',
        choices: [
          'Free shipping on the current order',
          'A full refund',
          'A 10% discount on the next purchase',
          'A free replacement product'
        ],
        answer: 2,
        explanation: '「we are offering you a 10% discount on your next purchase」と記載されています。'
      },
      {
        id: 4,
        question: 'What does "gesture of goodwill" mean in this context?',
        choices: [
          'A legal requirement',
          'A friendly action to show good intentions',
          'A mandatory company policy',
          'A formal business contract'
        ],
        answer: 1,
        explanation: '「gesture of goodwill」は「善意の表れ」を意味し、お客様への誠意を示す行為です。'
      },
      {
        id: 5,
        question: 'What option does the customer have if she does not want to wait?',
        choices: [
          'Choose a different product',
          'Pick up the item at the store',
          'Cancel the order for a full refund',
          'Request expedited shipping at no cost'
        ],
        answer: 2,
        explanation: '「If you would prefer to cancel your order for a full refund」と記載されており、キャンセルして全額返金を受けることができます。'
      }
    ]
  },
  {
    id: 11,
    title: 'Company Newsletter Article',
    passage: `Employee of the Quarter: David Kim

We are delighted to announce that David Kim from the Customer Support Department has been named Employee of the Quarter for January through March. David has consistently demonstrated exceptional dedication to customer satisfaction, handling an average of 85 support tickets per week while maintaining a 98% customer satisfaction rating.

In addition to his outstanding performance in his regular duties, David volunteered to lead the training program for five new team members who joined in February. His patience and thorough approach helped the new hires become productive much faster than expected.

David's manager, Rachel Foster, stated, "David is the kind of employee every team needs. He goes above and beyond every day, and his positive attitude is truly inspiring."

As Employee of the Quarter, David will receive a $500 bonus, two extra vacation days, and a reserved parking spot for the next three months. Please join us in congratulating David on this well-deserved recognition.`,
    level: 650,
    category: 'article',
    questions: [
      {
        id: 1,
        question: 'Which department does David Kim work in?',
        choices: [
          'Sales',
          'Marketing',
          'Customer Support',
          'Human Resources'
        ],
        answer: 2,
        explanation: '「David Kim from the Customer Support Department」と記載されています。'
      },
      {
        id: 2,
        question: 'What is David\'s customer satisfaction rating?',
        choices: [
          '85%',
          '90%',
          '95%',
          '98%'
        ],
        answer: 3,
        explanation: '「maintaining a 98% customer satisfaction rating」と記載されています。'
      },
      {
        id: 3,
        question: 'What extra task did David take on?',
        choices: [
          'Managing a new project',
          'Training new team members',
          'Organizing a company event',
          'Writing a department report'
        ],
        answer: 1,
        explanation: '「David volunteered to lead the training program for five new team members」と記載されています。'
      },
      {
        id: 4,
        question: 'What does "goes above and beyond" mean?',
        choices: [
          'Does less than expected',
          'Does more than what is required',
          'Works overtime reluctantly',
          'Follows instructions exactly'
        ],
        answer: 1,
        explanation: '「goes above and beyond」は「期待以上のことをする」という意味のイディオムです。'
      },
      {
        id: 5,
        question: 'Which of the following is NOT a reward for Employee of the Quarter?',
        choices: [
          'A $500 bonus',
          'Two extra vacation days',
          'A reserved parking spot',
          'A promotion to a management position'
        ],
        answer: 3,
        explanation: '管理職への昇進は報酬として述べられていません。ボーナス、追加休暇、駐車スペースの3つが報酬です。'
      }
    ]
  },
  {
    id: 12,
    title: 'Apartment Rental Advertisement',
    passage: `Spacious Two-Bedroom Apartment for Rent

A bright and modern two-bedroom apartment is available for rent starting May 1 in the heart of downtown. The apartment is located on the 8th floor of the Riverside Tower building and offers stunning views of the river and city skyline.

Features include:
- Two spacious bedrooms with built-in closets
- Open-plan living and dining area
- Fully equipped kitchen with dishwasher and microwave
- In-unit washer and dryer
- One covered parking space included
- 24-hour security and concierge service

The monthly rent is $1,850, which includes water and trash removal. Electricity and internet are the responsibility of the tenant. A security deposit equal to one month's rent is required upon signing the lease. The minimum lease term is 12 months.

Pets are allowed with an additional monthly pet fee of $50. No smoking is permitted inside the building.

For viewing appointments, please contact the building management office at (555) 234-5678.`,
    level: 650,
    category: 'advertisement',
    questions: [
      {
        id: 1,
        question: 'What is included in the monthly rent?',
        choices: [
          'Electricity and internet',
          'Water and trash removal',
          'All utilities',
          'Parking and internet'
        ],
        answer: 1,
        explanation: '「which includes water and trash removal」と記載されています。'
      },
      {
        id: 2,
        question: 'How much is the security deposit?',
        choices: [
          '$925',
          '$1,850',
          '$2,000',
          '$3,700'
        ],
        answer: 1,
        explanation: '「A security deposit equal to one month\'s rent」とあり、家賃は$1,850なので、敷金も$1,850です。'
      },
      {
        id: 3,
        question: 'What is the minimum lease period?',
        choices: [
          '6 months',
          '9 months',
          '12 months',
          '24 months'
        ],
        answer: 2,
        explanation: '「The minimum lease term is 12 months」と記載されています。'
      },
      {
        id: 4,
        question: 'What can be inferred about the building?',
        choices: [
          'It is an older building in need of repairs',
          'It is a well-maintained building with good amenities',
          'It is located in a suburban area',
          'It does not have an elevator'
        ],
        answer: 1,
        explanation: '24時間セキュリティ、コンシェルジュサービス、川と都市のスカイラインの眺めなどから、管理が行き届いた設備の良い建物であることが推測できます。'
      },
      {
        id: 5,
        question: 'What restriction applies to tenants with pets?',
        choices: [
          'Pets are not allowed at all',
          'Only cats are permitted',
          'An additional monthly fee of $50 is charged',
          'Pets are only allowed on certain floors'
        ],
        answer: 2,
        explanation: '「Pets are allowed with an additional monthly pet fee of $50」と記載されています。'
      }
    ]
  },
  {
    id: 13,
    title: 'Training Program Memo',
    passage: `MEMORANDUM

To: All Sales Representatives
From: Thomas Grant, Sales Director
Date: March 5
Subject: Mandatory Product Training – New CRM Software

Please be informed that the company has purchased a new Customer Relationship Management (CRM) software system called SalesForce360. This system will replace our current software, ClientTracker, beginning April 1.

To ensure a smooth transition, all sales representatives are required to attend a mandatory training session. Two sessions are available:

Session A: March 18, 9:00 AM – 1:00 PM (Conference Room A)
Session B: March 19, 2:00 PM – 6:00 PM (Conference Room B)

Each representative must attend one session. Please confirm your preferred session with your team leader by March 12. Those who do not respond will be automatically enrolled in Session A.

The training will cover basic navigation, entering customer data, generating reports, and tracking sales leads. Laptops will be provided during the session for hands-on practice. If you have any questions, please do not hesitate to contact me directly.`,
    level: 650,
    category: 'memo',
    questions: [
      {
        id: 1,
        question: 'What software is being replaced?',
        choices: [
          'SalesForce360',
          'ClientTracker',
          'CRM Pro',
          'SalesManager'
        ],
        answer: 1,
        explanation: '「This system will replace our current software, ClientTracker」と記載されています。'
      },
      {
        id: 2,
        question: 'How many training sessions are available?',
        choices: [
          'One',
          'Two',
          'Three',
          'Four'
        ],
        answer: 1,
        explanation: 'Session AとSession Bの2つのセッションが用意されています。'
      },
      {
        id: 3,
        question: 'What happens if an employee does not choose a session?',
        choices: [
          'They are excused from the training',
          'They must schedule a private session',
          'They are automatically enrolled in Session A',
          'They will attend both sessions'
        ],
        answer: 2,
        explanation: '「Those who do not respond will be automatically enrolled in Session A」と記載されています。'
      },
      {
        id: 4,
        question: 'What does "mandatory" mean in this context?',
        choices: [
          'Optional',
          'Recommended',
          'Required',
          'Voluntary'
        ],
        answer: 2,
        explanation: '「mandatory」は「義務的な・必須の」を意味し、全員が参加しなければならないことを示しています。'
      },
      {
        id: 5,
        question: 'What will be provided during the training?',
        choices: [
          'Lunch and refreshments',
          'Printed manuals',
          'Laptops for hands-on practice',
          'Gift cards for attendance'
        ],
        answer: 2,
        explanation: '「Laptops will be provided during the session for hands-on practice」と記載されています。'
      }
    ]
  },
  {
    id: 14,
    title: 'Health and Safety Article',
    passage: `Workplace Ergonomics: Preventing Common Injuries

According to a recent report by the Occupational Health Institute, musculoskeletal disorders account for nearly 30% of all workplace injuries. Many of these injuries are caused by poor posture, repetitive movements, and improperly arranged workstations.

Experts recommend several measures to reduce the risk of injury. First, employees should adjust their chairs so that their feet rest flat on the floor and their knees are at a 90-degree angle. Computer monitors should be positioned at eye level to avoid neck strain. Taking short breaks every 30 minutes to stretch and move around can significantly reduce muscle tension.

Employers also play an important role. Companies should invest in adjustable desks and ergonomic keyboards, and provide employees with guidelines on proper workstation setup. Some organizations have hired ergonomic consultants to assess individual workstations and make personalized recommendations.

By taking these preventive steps, both employees and employers can create a healthier and more productive work environment.`,
    level: 650,
    category: 'article',
    questions: [
      {
        id: 1,
        question: 'What percentage of workplace injuries are musculoskeletal disorders?',
        choices: [
          '20%',
          '25%',
          '30%',
          '35%'
        ],
        answer: 2,
        explanation: '「musculoskeletal disorders account for nearly 30% of all workplace injuries」と記載されています。'
      },
      {
        id: 2,
        question: 'Where should computer monitors be positioned?',
        choices: [
          'Below desk level',
          'At eye level',
          'Above head level',
          'To the side of the desk'
        ],
        answer: 1,
        explanation: '「Computer monitors should be positioned at eye level」と記載されています。'
      },
      {
        id: 3,
        question: 'How often should employees take breaks?',
        choices: [
          'Every 15 minutes',
          'Every 30 minutes',
          'Every 60 minutes',
          'Every 90 minutes'
        ],
        answer: 1,
        explanation: '「Taking short breaks every 30 minutes」と記載されています。'
      },
      {
        id: 4,
        question: 'What does "musculoskeletal" most likely relate to?',
        choices: [
          'The brain and nervous system',
          'The heart and blood vessels',
          'Muscles and bones',
          'The respiratory system'
        ],
        answer: 2,
        explanation: '「musculoskeletal」は「筋骨格の」を意味し、筋肉と骨に関連する障害を指しています。'
      },
      {
        id: 5,
        question: 'What have some companies done to address ergonomic issues?',
        choices: [
          'Reduced working hours',
          'Hired ergonomic consultants',
          'Banned computer use',
          'Required employees to stand all day'
        ],
        answer: 1,
        explanation: '「Some organizations have hired ergonomic consultants to assess individual workstations」と記載されています。'
      }
    ]
  },
  {
    id: 15,
    title: 'Conference Registration Email',
    passage: `Subject: Registration Confirmation – Global Marketing Summit 2026

Dear Mr. Nakamura,

Thank you for registering for the Global Marketing Summit 2026. We are pleased to confirm your attendance at this year's event.

Event Details:
Date: May 15-17, 2026
Venue: Grand Convention Center, 1200 Harbor Boulevard, San Francisco
Registration Type: Full Conference Pass ($495)

Your registration includes access to all keynote speeches, panel discussions, and breakout sessions over the three-day conference. It also includes daily lunch, networking events on May 15 and 16 evenings, and a digital copy of all presentation materials.

Please note that the optional pre-conference workshop on Digital Analytics (May 14, $150) is not included in your registration. If you would like to add this workshop, please reply to this email by April 25.

Hotel accommodations can be booked at a discounted rate of $159 per night at the Harbor View Hotel. Use the code GMS2026 when making your reservation. This rate is available until April 30.

We look forward to seeing you in San Francisco!

Best regards,
Event Registration Team`,
    level: 650,
    category: 'business email',
    questions: [
      {
        id: 1,
        question: 'How long is the conference?',
        choices: [
          'One day',
          'Two days',
          'Three days',
          'Four days'
        ],
        answer: 2,
        explanation: '「May 15-17」の3日間の会議です。'
      },
      {
        id: 2,
        question: 'What is NOT included in the Full Conference Pass?',
        choices: [
          'Keynote speeches',
          'Daily lunch',
          'Pre-conference workshop',
          'Networking events'
        ],
        answer: 2,
        explanation: '「the optional pre-conference workshop on Digital Analytics... is not included in your registration」と記載されています。'
      },
      {
        id: 3,
        question: 'How much does the Full Conference Pass cost?',
        choices: [
          '$150',
          '$395',
          '$495',
          '$645'
        ],
        answer: 2,
        explanation: '「Registration Type: Full Conference Pass ($495)」と記載されています。'
      },
      {
        id: 4,
        question: 'What is the discount code for hotel reservations?',
        choices: [
          'SUMMIT2026',
          'GMS2026',
          'HARBOR159',
          'CONF2026'
        ],
        answer: 1,
        explanation: '「Use the code GMS2026 when making your reservation」と記載されています。'
      },
      {
        id: 5,
        question: 'By when must Mr. Nakamura reply to add the workshop?',
        choices: [
          'April 20',
          'April 25',
          'April 30',
          'May 14'
        ],
        answer: 1,
        explanation: '「please reply to this email by April 25」と記載されています。'
      }
    ]
  },
  {
    id: 16,
    title: 'Public Library Notice',
    passage: `Riverside Public Library – Important Updates

Dear Library Members,

We are writing to inform you of several changes that will take effect starting April 1.

Extended Hours: Due to popular demand, the library will now be open until 9:00 PM on weekdays, one hour later than our current closing time. Weekend hours will remain unchanged (9:00 AM to 5:00 PM).

New Digital Resources: We have added over 5,000 e-books and audiobooks to our digital collection. Members can borrow up to five digital items at a time through the ReadAnywhere app, available for download on iOS and Android devices.

Overdue Fee Changes: The daily overdue fee for physical books will be reduced from $0.50 to $0.25 per day. However, the maximum fine per item will remain at $10.00. As a reminder, digital items are automatically returned on their due date, so no overdue fees apply.

Community Room: Our newly renovated community room is now available for booking. Non-profit organizations may use the room free of charge, while other groups will be charged $25 per hour.

For more information, visit our website at www.riversidelibrary.org.`,
    level: 650,
    category: 'notice',
    questions: [
      {
        id: 1,
        question: 'What time does the library currently close on weekdays?',
        choices: [
          '7:00 PM',
          '8:00 PM',
          '9:00 PM',
          '10:00 PM'
        ],
        answer: 1,
        explanation: '新しい閉館時間が9:00 PMで「one hour later than our current closing time」とあるので、現在は8:00 PMに閉館しています。'
      },
      {
        id: 2,
        question: 'How many digital items can members borrow at once?',
        choices: [
          'Three',
          'Five',
          'Seven',
          'Ten'
        ],
        answer: 1,
        explanation: '「Members can borrow up to five digital items at a time」と記載されています。'
      },
      {
        id: 3,
        question: 'What is the new daily overdue fee for physical books?',
        choices: [
          '$0.10',
          '$0.25',
          '$0.50',
          '$1.00'
        ],
        answer: 1,
        explanation: '「The daily overdue fee for physical books will be reduced from $0.50 to $0.25 per day」と記載されています。'
      },
      {
        id: 4,
        question: 'Who can use the community room for free?',
        choices: [
          'All library members',
          'Local businesses',
          'Non-profit organizations',
          'Students and teachers'
        ],
        answer: 2,
        explanation: '「Non-profit organizations may use the room free of charge」と記載されています。'
      },
      {
        id: 5,
        question: 'What can be inferred about digital items?',
        choices: [
          'They are more expensive to borrow than physical books',
          'They cannot accumulate overdue fees',
          'They are only available on weekends',
          'They require a special membership'
        ],
        answer: 1,
        explanation: '「digital items are automatically returned on their due date, so no overdue fees apply」と記載されており、デジタルアイテムには延滞料金がかからないことがわかります。'
      }
    ]
  },
  {
    id: 17,
    title: 'Customer Satisfaction Survey Results',
    passage: `Annual Customer Satisfaction Survey – Summary Report

Brightstar Telecommunications conducted its annual customer satisfaction survey in January, receiving responses from 4,200 customers across all service areas. The overall satisfaction rate was 82%, a 5% increase from the previous year.

The highest-rated category was Network Reliability, with 89% of respondents rating it as "good" or "excellent." Customer Service received the lowest rating at 71%, although this represents a significant improvement from last year's 63%.

Several common themes emerged from the open-ended comments. Many customers praised the company's competitive pricing and the quality of its 5G network. However, long wait times when calling the customer service hotline were frequently mentioned as an area for improvement. Some customers also requested more self-service options on the company website.

In response to the feedback, the company plans to hire 50 additional customer service representatives by June and launch an improved online help center in August. Management is committed to raising the overall satisfaction rate to 85% by the end of this year.`,
    level: 650,
    category: 'article',
    questions: [
      {
        id: 1,
        question: 'How many customers responded to the survey?',
        choices: [
          '2,400',
          '3,500',
          '4,200',
          '5,000'
        ],
        answer: 2,
        explanation: '「receiving responses from 4,200 customers」と記載されています。'
      },
      {
        id: 2,
        question: 'Which category received the highest rating?',
        choices: [
          'Customer Service',
          'Network Reliability',
          'Pricing',
          '5G Network Quality'
        ],
        answer: 1,
        explanation: '「The highest-rated category was Network Reliability, with 89%」と記載されています。'
      },
      {
        id: 3,
        question: 'What was the Customer Service rating last year?',
        choices: [
          '55%',
          '63%',
          '71%',
          '82%'
        ],
        answer: 1,
        explanation: '「this represents a significant improvement from last year\'s 63%」と記載されています。'
      },
      {
        id: 4,
        question: 'What action is the company taking to improve customer service?',
        choices: [
          'Reducing prices',
          'Expanding 5G coverage',
          'Hiring 50 additional customer service representatives',
          'Closing the customer service hotline'
        ],
        answer: 2,
        explanation: '「the company plans to hire 50 additional customer service representatives by June」と記載されています。'
      },
      {
        id: 5,
        question: 'What is the company\'s satisfaction rate target for this year?',
        choices: [
          '82%',
          '85%',
          '89%',
          '90%'
        ],
        answer: 1,
        explanation: '「raising the overall satisfaction rate to 85% by the end of this year」と記載されています。'
      }
    ]
  }
];
