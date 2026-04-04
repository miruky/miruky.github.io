import { ToeicPart7Set } from './types';

export const toeicPart7Questions: ToeicPart7Set[] = [
  // ===== SINGLE PASSAGE SETS (1-10): 4 questions each = 40 questions =====

  // Set 1: Email - Office Relocation
  {
    id: 1,
    type: 'single',
    passages: [
      `To: All Employees\nFrom: Sarah Mitchell, Facilities Manager\nDate: March 15\nSubject: Office Relocation Update\n\nDear Team,\n\nI am writing to inform you that our office relocation to the Greenfield Business Center has been confirmed for April 20. The new office is located at 450 Harbor Drive, Suite 300. The building offers modern amenities including a fitness center, a cafeteria, and underground parking.\n\nAll employees are expected to pack their personal belongings by April 18. Packing supplies will be distributed on April 10. The IT department will handle the transfer of all computers and electronic equipment. Please label all boxes clearly with your name and department.\n\nDuring the transition period from April 19 to April 21, remote work will be permitted. Please coordinate with your team leaders regarding project deadlines. If you have any questions or concerns about the relocation, please contact me at s.mitchell@company.com or extension 4521.\n\nBest regards,\nSarah Mitchell`
    ],
    questions: [
      {
        id: 1,
        question: 'What is the purpose of this email?',
        choices: [
          'To announce a company merger',
          'To notify employees about an office move',
          'To introduce a new facilities manager',
          'To request feedback on office design'
        ],
        answer: 1,
        explanation: 'メールの件名と本文から、オフィス移転について従業員に通知する目的であることがわかります。'
      },
      {
        id: 2,
        question: 'When should employees finish packing their belongings?',
        choices: [
          'By April 10',
          'By April 15',
          'By April 18',
          'By April 20'
        ],
        answer: 2,
        explanation: '「All employees are expected to pack their personal belongings by April 18」と記載されています。'
      },
      {
        id: 3,
        question: 'What will the IT department be responsible for?',
        choices: [
          'Distributing packing supplies',
          'Moving computers and electronic equipment',
          'Arranging remote work schedules',
          'Labeling boxes for each department'
        ],
        answer: 1,
        explanation: '「The IT department will handle the transfer of all computers and electronic equipment」と明記されています。'
      },
      {
        id: 4,
        question: 'What is NOT mentioned as a feature of the new building?',
        choices: [
          'A fitness center',
          'A cafeteria',
          'A rooftop garden',
          'Underground parking'
        ],
        answer: 2,
        explanation: 'フィットネスセンター、カフェテリア、地下駐車場は記載されていますが、屋上庭園については触れられていません。'
      }
    ]
  },

  // Set 2: Advertisement - Training Program
  {
    id: 2,
    type: 'single',
    passages: [
      `ADVANCE YOUR CAREER WITH PROTECH SOLUTIONS\n\nAre you looking to enhance your professional skills? ProTech Solutions is now accepting applications for its acclaimed Project Management Certification Program.\n\nProgram Highlights:\n- 12-week intensive course starting June 1\n- Led by industry experts with 15+ years of experience\n- Covers all aspects of project planning, execution, and delivery\n- Includes preparation for the PMP certification exam\n- Evening and weekend classes available\n\nTuition: $2,400 (early bird discount of 15% for registrations before May 1)\nLocation: ProTech Training Center, 780 Innovation Blvd.\n\nGraduates of our program have reported an average salary increase of 22% within one year. Over 90% of participants pass the PMP exam on their first attempt.\n\nTo register or request a brochure, visit www.protechsolutions.com or call (555) 890-1234. Space is limited to 30 participants per session, so register early to secure your spot.\n\nProTech Solutions — Building Tomorrow's Leaders Today`
    ],
    questions: [
      {
        id: 5,
        question: 'What is being advertised?',
        choices: [
          'A job opening at ProTech Solutions',
          'A project management training program',
          'A new software product',
          'A business consulting service'
        ],
        answer: 1,
        explanation: '「Project Management Certification Program」というプロジェクト管理の研修プログラムの広告です。'
      },
      {
        id: 6,
        question: 'How much would a person pay if they register on April 25?',
        choices: [
          '$2,400',
          '$2,040',
          '$2,160',
          '$1,800'
        ],
        answer: 1,
        explanation: '5月1日より前に登録すると15%割引が適用されます。$2,400 × 0.85 = $2,040です。'
      },
      {
        id: 7,
        question: 'What is implied about the PMP exam?',
        choices: [
          'It is included in the tuition fee',
          'It is only offered on weekends',
          'Most program graduates pass it successfully',
          'It must be taken within 12 weeks'
        ],
        answer: 2,
        explanation: '「Over 90% of participants pass the PMP exam on their first attempt」から、ほとんどの卒業生が合格していることが推測できます。'
      },
      {
        id: 8,
        question: 'What does the advertisement suggest about class size?',
        choices: [
          'There is no limit on enrollment',
          'The program accepts up to 30 students',
          'Classes are divided into small groups of 10',
          'Additional sessions will be added if needed'
        ],
        answer: 1,
        explanation: '「Space is limited to 30 participants per session」と記載されており、定員は30名です。'
      }
    ]
  },

  // Set 3: Notice - Building Maintenance
  {
    id: 3,
    type: 'single',
    passages: [
      `NOTICE TO ALL TENANTS\nSilverstone Office Complex\n\nDate: February 8\n\nPlease be advised that scheduled maintenance work will be conducted on the building's heating, ventilation, and air conditioning (HVAC) system during the weekend of February 22-23. The maintenance is necessary to replace aging components and improve energy efficiency throughout the building.\n\nDuring the maintenance period, the HVAC system will be shut down from 8:00 A.M. Saturday to 6:00 P.M. Sunday. Tenants who plan to work during the weekend should dress appropriately and note that restroom facilities on the third floor will also be temporarily unavailable due to related plumbing work.\n\nWe understand this may cause some inconvenience and sincerely apologize. The upgraded system is expected to reduce energy costs by approximately 20% and provide more consistent temperature control throughout the building.\n\nFor any concerns, please contact the building management office at (555) 342-7890 during business hours or email maintenance@silverstonecomplex.com.\n\nThank you for your understanding.\nSilverstone Management Team`
    ],
    questions: [
      {
        id: 9,
        question: 'What is the main purpose of this notice?',
        choices: [
          'To announce a rent increase',
          'To inform tenants about upcoming maintenance',
          'To introduce new building security measures',
          'To request tenant feedback on building services'
        ],
        answer: 1,
        explanation: 'HVACシステムのメンテナンス作業についてテナントに通知する目的です。'
      },
      {
        id: 10,
        question: 'How long will the HVAC system be shut down?',
        choices: [
          'Approximately 10 hours',
          'Approximately 24 hours',
          'Approximately 34 hours',
          'Approximately 48 hours'
        ],
        answer: 2,
        explanation: '土曜日の午前8時から日曜日の午後6時まで、約34時間の停止予定です。'
      },
      {
        id: 11,
        question: 'What benefit is expected from the maintenance work?',
        choices: [
          'Additional office space',
          'Faster elevator service',
          'Lower energy expenses',
          'Improved internet connectivity'
        ],
        answer: 2,
        explanation: '「reduce energy costs by approximately 20%」とあり、エネルギーコストの削減が期待されています。'
      },
      {
        id: 12,
        question: 'Which floor will have limited restroom access during the weekend?',
        choices: [
          'The first floor',
          'The second floor',
          'The third floor',
          'All floors'
        ],
        answer: 2,
        explanation: '「restroom facilities on the third floor will also be temporarily unavailable」と記載されています。'
      }
    ]
  },

  // Set 4: Article - New Restaurant Opening
  {
    id: 4,
    type: 'single',
    passages: [
      `RIVERSIDE DINING MAKES A SPLASH IN DOWNTOWN\nBy Jennifer Cole, Food & Lifestyle Editor\n\nMaple & Vine, a new farm-to-table restaurant, officially opened its doors last Saturday at 125 Riverside Avenue in the heart of downtown. The restaurant, owned by award-winning chef Marcus Liu, focuses on locally sourced ingredients and seasonal menus.\n\nThe 80-seat establishment features an open kitchen design, allowing diners to watch their meals being prepared. The interior, designed by renowned architect Diane Park, combines rustic wooden elements with modern lighting to create a warm yet sophisticated atmosphere.\n\nLunch service runs from 11:30 A.M. to 2:30 P.M., and dinner from 5:30 P.M. to 10:00 P.M., Tuesday through Sunday. The restaurant is closed on Mondays. Reservations are strongly recommended, as the opening weekend saw every table booked within hours of becoming available.\n\n"We want to celebrate the amazing produce from local farms and bring people together over great food," said Chef Liu during the opening event. A special brunch menu will be introduced starting next month.`
    ],
    questions: [
      {
        id: 13,
        question: 'What type of article is this?',
        choices: [
          'A restaurant review',
          'A news report about a restaurant opening',
          'An advertisement for a catering service',
          'A profile of a restaurant designer'
        ],
        answer: 1,
        explanation: 'レストランのオープンを報じるニュース記事です。レビューではなく、新規開店の紹介です。'
      },
      {
        id: 14,
        question: 'What is a distinguishing feature of Maple & Vine?',
        choices: [
          'It has a private dining room for large parties',
          'It serves only vegetarian dishes',
          'Guests can observe the cooking process',
          'It offers free delivery within the city'
        ],
        answer: 2,
        explanation: '「an open kitchen design, allowing diners to watch their meals being prepared」とオープンキッチンが特徴として述べられています。'
      },
      {
        id: 15,
        question: 'On which day is the restaurant closed?',
        choices: [
          'Sunday',
          'Monday',
          'Tuesday',
          'Saturday'
        ],
        answer: 1,
        explanation: '「The restaurant is closed on Mondays」と明記されています。'
      },
      {
        id: 16,
        question: 'What can be inferred about the restaurant\'s opening?',
        choices: [
          'It did not attract many customers initially',
          'It received strong public interest from the start',
          'It was delayed due to construction issues',
          'It offered discounts during the first week'
        ],
        answer: 1,
        explanation: '「every table booked within hours of becoming available」から、非常に高い関心を集めたことが推測できます。'
      }
    ]
  },

  // Set 5: Schedule / Itinerary - Conference
  {
    id: 5,
    type: 'single',
    passages: [
      `PACIFIC BUSINESS INNOVATION CONFERENCE 2026\nApril 15-17 | Grand Harbor Convention Center\n\nDAY 1 — April 15 (Wednesday)\n8:00 - 9:00    Registration & Welcome Coffee (Main Lobby)\n9:00 - 10:30   Opening Keynote: "The Future of Digital Commerce" — Dr. Helen Park, CEO of NovaTech\n10:30 - 10:45  Break\n10:45 - 12:15  Panel: AI in Business Operations (Hall A) / Workshop: Data Analytics for Beginners (Room 201)\n12:15 - 1:30   Lunch (Ballroom C)\n1:30 - 3:00    Panel: Sustainable Business Practices (Hall A) / Workshop: Cloud Migration Strategies (Room 201)\n3:00 - 3:15    Break\n3:15 - 4:45    Breakout Sessions (Various Rooms)\n5:00 - 7:00    Welcome Reception & Networking (Rooftop Terrace)\n\nDAY 2 — April 16 (Thursday)\n9:00 - 10:30   Keynote: "Leading Through Change" — James Carter, Author & Consultant\n10:45 - 12:15  Industry-Specific Roundtables\n12:15 - 1:30   Lunch & Exhibitor Showcase\n1:30 - 3:00    Panel: Cybersecurity Trends 2026 (Hall A)\n3:15 - 4:45    Workshop: Building Remote Teams (Room 201)\n6:00 - 9:00    Gala Dinner (Grand Ballroom) — Guest Speaker: Mayor Linda Chen\n\nNote: All registered attendees receive complimentary access to the exhibitor area throughout the conference. Workshops have limited seating; sign up at the registration desk.`
    ],
    questions: [
      {
        id: 17,
        question: 'How many days does the conference last?',
        choices: [
          'One day',
          'Two days',
          'Three days',
          'Four days'
        ],
        answer: 2,
        explanation: 'スケジュールにはDay 1とDay 2のみ記載されていますが、ヘッダーに「April 15-17」と3日間と示されています。ただし表示はDay 1とDay 2のみであり、全体は3日間です。'
      },
      {
        id: 18,
        question: 'What happens at the same time as the AI panel on Day 1?',
        choices: [
          'The opening keynote',
          'A data analytics workshop',
          'The welcome reception',
          'Industry roundtables'
        ],
        answer: 1,
        explanation: '10:45-12:15のスロットで、AIパネル（Hall A）とデータ分析ワークショップ（Room 201）が同時開催されています。'
      },
      {
        id: 19,
        question: 'Who is giving the opening keynote speech?',
        choices: [
          'James Carter',
          'Mayor Linda Chen',
          'Dr. Helen Park',
          'The conference organizer'
        ],
        answer: 2,
        explanation: 'Day 1の開会基調講演はDr. Helen Park（NovaTech CEO）が担当しています。'
      },
      {
        id: 20,
        question: 'What is indicated about the workshops?',
        choices: [
          'They are held in Hall A',
          'They require an additional fee',
          'They have a limited number of seats',
          'They are only available on Day 2'
        ],
        answer: 2,
        explanation: '「Workshops have limited seating; sign up at the registration desk」と座席数に制限があることが記載されています。'
      }
    ]
  },

  // Set 6: Review - Product Review
  {
    id: 6,
    type: 'single',
    passages: [
      `PRODUCT REVIEW: CLEARVIEW PRO 4K MONITOR\nReviewer: TechGadget Weekly | Rating: ★★★★☆ (4/5)\n\nThe ClearView Pro 4K Monitor from DisplayMax is an impressive addition to the company's lineup. Featuring a 32-inch IPS panel with true 4K resolution, this monitor delivers stunning color accuracy and wide viewing angles, making it ideal for graphic designers and video editors.\n\nSetup was straightforward — the monitor comes with an adjustable stand that allows height, tilt, and swivel adjustments. Connectivity options include two HDMI ports, one DisplayPort, and a USB-C port that supports 65W power delivery, which is convenient for laptop users.\n\nIn our tests, the monitor achieved 99% sRGB color coverage and excellent contrast ratios. The built-in blue light filter is a welcome addition for long working sessions. However, the built-in speakers are disappointing — they lack bass and volume, so external speakers or headphones are recommended.\n\nAt $549, the ClearView Pro is competitively priced compared to similar monitors from leading brands. We would highly recommend it for professionals who prioritize color accuracy, though gamers may want to look elsewhere due to the 60Hz refresh rate.\n\nPros: Excellent color accuracy, versatile connectivity, ergonomic stand, USB-C charging\nCons: Weak built-in speakers, 60Hz refresh rate`
    ],
    questions: [
      {
        id: 21,
        question: 'Who would benefit most from this monitor according to the review?',
        choices: [
          'Professional gamers',
          'Graphic designers',
          'Home entertainment users',
          'Budget-conscious students'
        ],
        answer: 1,
        explanation: '「ideal for graphic designers and video editors」とあり、グラフィックデザイナーに最適と述べられています。'
      },
      {
        id: 22,
        question: 'What is the main criticism of the monitor?',
        choices: [
          'The screen resolution is too low',
          'The stand is not adjustable',
          'The audio quality is poor',
          'The price is too high'
        ],
        answer: 2,
        explanation: '内蔵スピーカーの低音と音量が不足していると批判されており、外部スピーカーが推奨されています。'
      },
      {
        id: 23,
        question: 'What feature is described as convenient for laptop users?',
        choices: [
          'The HDMI ports',
          'The blue light filter',
          'The USB-C port with power delivery',
          'The adjustable stand'
        ],
        answer: 2,
        explanation: '「USB-C port that supports 65W power delivery, which is convenient for laptop users」と記載されています。'
      },
      {
        id: 24,
        question: 'Why might gamers not prefer this monitor?',
        choices: [
          'It does not support 4K resolution',
          'It has a low refresh rate',
          'It is too expensive for gaming',
          'It does not have HDMI ports'
        ],
        answer: 1,
        explanation: '「gamers may want to look elsewhere due to the 60Hz refresh rate」と60Hzのリフレッシュレートがゲーマーには不向きと述べています。'
      }
    ]
  },

  // Set 7: Web Page - Job Posting
  {
    id: 7,
    type: 'single',
    passages: [
      `BRIGHTPATH CONSULTING — CAREERS\n\nPosition: Senior Marketing Analyst\nDepartment: Marketing & Strategy\nLocation: San Francisco, CA (Hybrid — 3 days in office)\nSalary Range: $95,000 - $120,000 annually\nPosted: March 1, 2026\n\nAbout the Role:\nBrightPath Consulting is seeking a Senior Marketing Analyst to join our growing team. The ideal candidate will leverage data-driven insights to shape marketing strategies for our Fortune 500 clients. This role involves analyzing market trends, consumer behavior, and campaign performance to deliver actionable recommendations.\n\nRequirements:\n- Bachelor's degree in Marketing, Business, Statistics, or a related field\n- Minimum 5 years of experience in marketing analytics\n- Proficiency in SQL, Python, and data visualization tools (e.g., Tableau, Power BI)\n- Strong communication and presentation skills\n- Experience with A/B testing and campaign optimization\n\nPreferred Qualifications:\n- Master's degree in a related field\n- Experience in consulting or professional services\n- Familiarity with CRM platforms such as Salesforce\n\nBenefits:\n- Comprehensive health and dental insurance\n- 401(k) matching up to 6%\n- Annual professional development budget of $3,000\n- 20 days paid time off plus company holidays\n\nTo apply, submit your resume and cover letter through our careers portal by March 31, 2026.`
    ],
    questions: [
      {
        id: 25,
        question: 'What type of work arrangement does this position offer?',
        choices: [
          'Fully remote',
          'Fully on-site',
          'A combination of remote and in-office work',
          'Flexible freelance hours'
        ],
        answer: 2,
        explanation: '「Hybrid — 3 days in office」とハイブリッド勤務であることが示されています。'
      },
      {
        id: 26,
        question: 'Which of the following is a required qualification?',
        choices: [
          'A master\'s degree',
          'Experience with Salesforce',
          'Knowledge of SQL and Python',
          'Consulting experience'
        ],
        answer: 2,
        explanation: 'SQLとPythonの熟練度は「Requirements」に記載されています。修士号やSalesforceは「Preferred」です。'
      },
      {
        id: 27,
        question: 'What is the application deadline?',
        choices: [
          'March 1, 2026',
          'March 15, 2026',
          'March 31, 2026',
          'April 1, 2026'
        ],
        answer: 2,
        explanation: '「submit your resume and cover letter through our careers portal by March 31, 2026」と記載されています。'
      },
      {
        id: 28,
        question: 'What benefit does the company offer for continuing education?',
        choices: [
          'Free university tuition',
          'A $3,000 annual development budget',
          'On-site training workshops',
          'Paid study leave for up to 6 months'
        ],
        answer: 1,
        explanation: '「Annual professional development budget of $3,000」と年間$3,000の研修予算が福利厚生として挙げられています。'
      }
    ]
  },

  // Set 8: Online Chat - Customer Support
  {
    id: 8,
    type: 'single',
    passages: [
      `LIVECHAT SUPPORT — NORTHWIND ELECTRONICS\n\n[2:14 PM] Customer (Amy Ross): Hi, I placed an order three days ago (Order #NW-88421) for a wireless keyboard and mouse set, but I haven't received a shipping confirmation yet.\n\n[2:15 PM] Support Agent (Kevin): Hello, Amy! Thank you for reaching out. Let me look up your order right away.\n\n[2:16 PM] Support Agent (Kevin): I found your order. It appears that the wireless mouse in your bundle is currently out of stock at our main warehouse. We expected a restock yesterday, but it has been delayed until Friday.\n\n[2:17 PM] Customer (Amy Ross): Oh, that's disappointing. I need the set by next Wednesday for a presentation.\n\n[2:18 PM] Support Agent (Kevin): I completely understand. I have two options for you: (1) We can ship the keyboard now and send the mouse separately once it's back in stock, with free express shipping on the mouse. (2) We can wait and ship both items together on Friday with upgraded express shipping at no extra charge, which should arrive by Monday.\n\n[2:19 PM] Customer (Amy Ross): Option 2 sounds good. Monday delivery would work for me.\n\n[2:20 PM] Support Agent (Kevin): Perfect! I've updated your order accordingly. You'll receive a confirmation email within the hour. As an apology for the delay, I've also applied a 10% discount to your order. Is there anything else I can help with?\n\n[2:21 PM] Customer (Amy Ross): No, that's great. Thank you, Kevin!\n\n[2:21 PM] Support Agent (Kevin): You're welcome, Amy! Have a wonderful day.`
    ],
    questions: [
      {
        id: 29,
        question: 'Why has Amy\'s order not been shipped?',
        choices: [
          'There was a payment processing error',
          'The shipping address was incorrect',
          'One of the items is out of stock',
          'The order was accidentally canceled'
        ],
        answer: 2,
        explanation: 'ワイヤレスマウスが在庫切れであるため、注文が発送されていません。'
      },
      {
        id: 30,
        question: 'Which option does Amy choose?',
        choices: [
          'Receiving the keyboard immediately and the mouse later',
          'Receiving both items together with express shipping',
          'Canceling the order and getting a refund',
          'Replacing the mouse with a different model'
        ],
        answer: 1,
        explanation: 'Amyは「Option 2 sounds good」と、金曜日に両方をまとめて急送するオプションを選びました。'
      },
      {
        id: 31,
        question: 'What additional compensation does Kevin offer?',
        choices: [
          'A free accessory',
          'Free next-day delivery',
          'A 10% discount on the order',
          'A store gift card'
        ],
        answer: 2,
        explanation: '「I\'ve also applied a 10% discount to your order」と10%割引を適用したと述べています。'
      },
      {
        id: 32,
        question: 'When does Amy need the items?',
        choices: [
          'By Friday',
          'By Saturday',
          'By Monday',
          'By Wednesday'
        ],
        answer: 3,
        explanation: '「I need the set by next Wednesday for a presentation」と水曜日までに必要だと述べています。'
      }
    ]
  },

  // Set 9: Form / Memo - Expense Report Policy
  {
    id: 9,
    type: 'single',
    passages: [
      `INTERNAL MEMORANDUM\n\nTo: All Department Managers\nFrom: Patricia Gomez, Chief Financial Officer\nDate: January 20, 2026\nRe: Updated Expense Reimbursement Policy\n\nEffective February 1, 2026, the following changes to the expense reimbursement policy will take effect:\n\n1. Receipt Requirement: All expenses over $25 must be accompanied by an original receipt or a clear digital scan. Previously, the threshold was $50.\n\n2. Submission Deadline: Expense reports must be submitted within 14 calendar days of the expense being incurred. Late submissions will require VP-level approval.\n\n3. Travel Meals: The daily meal allowance for domestic business travel has been increased from $60 to $75. International travel meal allowances remain unchanged at $100 per day.\n\n4. Mileage Rate: The mileage reimbursement rate has been updated to $0.67 per mile, in line with the latest IRS standard rate.\n\n5. Approval Workflow: All expense reports exceeding $500 must now be approved by both the department manager and the finance department.\n\nPlease share these updates with your teams. The updated expense report form is available on the company intranet under Forms & Documents. Training sessions on the new policy will be held on January 28 and 29.\n\nQuestions may be directed to the Finance Department at finance@company.com.`
    ],
    questions: [
      {
        id: 33,
        question: 'What is the new threshold for requiring a receipt?',
        choices: [
          '$15',
          '$25',
          '$50',
          '$75'
        ],
        answer: 1,
        explanation: '「All expenses over $25 must be accompanied by an original receipt」と$25以上で領収書が必要になりました。'
      },
      {
        id: 34,
        question: 'What happens if an expense report is submitted late?',
        choices: [
          'It will be automatically rejected',
          'A penalty fee will be charged',
          'VP-level approval will be needed',
          'The employee must resubmit the following month'
        ],
        answer: 2,
        explanation: '「Late submissions will require VP-level approval」と副社長レベルの承認が必要と記載されています。'
      },
      {
        id: 35,
        question: 'How much is the daily meal allowance for international travel?',
        choices: [
          '$60',
          '$67',
          '$75',
          '$100'
        ],
        answer: 3,
        explanation: '「International travel meal allowances remain unchanged at $100 per day」と国際出張は$100のままです。'
      },
      {
        id: 36,
        question: 'Who is the intended audience of this memo?',
        choices: [
          'All employees',
          'The finance department staff',
          'Department managers',
          'The executive board'
        ],
        answer: 2,
        explanation: '宛先が「All Department Managers」となっており、部門マネージャーが対象です。'
      }
    ]
  },

  // Set 10: Article - Market Trends
  {
    id: 10,
    type: 'single',
    passages: [
      `REMOTE WORK TREND CONTINUES TO RESHAPE COMMERCIAL REAL ESTATE\nBusiness Daily News | March 10, 2026\n\nThe shift toward remote and hybrid work models is having a lasting impact on the commercial real estate market, according to a new report by Summit Property Research. Office vacancy rates in major metropolitan areas reached 18.5% in the fourth quarter of 2025, up from 12.3% in 2019.\n\n"Companies are rethinking their space requirements," said Diana Reeves, lead analyst at Summit. "Many organizations are downsizing their traditional office footprint while investing in flexible coworking memberships for employees who need occasional in-person collaboration."\n\nThe report also found that demand for suburban office space has increased by 15% since 2023, as companies seek lower rents and proximity to where employees live. Meanwhile, Class A office buildings in city centers are faring better than older properties, with vacancy rates 6 percentage points lower on average.\n\nDespite the challenges, some sectors are expanding their physical presence. Technology firms and life sciences companies have been actively leasing laboratory and specialized research facilities, driving growth in those niche segments.\n\nThe report predicts that office vacancy rates will stabilize by 2027 as companies settle into long-term hybrid arrangements.`
    ],
    questions: [
      {
        id: 37,
        question: 'What is the main topic of this article?',
        choices: [
          'The growth of residential real estate markets',
          'The effect of remote work on office real estate',
          'New government regulations on building construction',
          'Investment opportunities in technology companies'
        ],
        answer: 1,
        explanation: 'リモートワークが商業不動産市場に与える影響がメインテーマです。'
      },
      {
        id: 38,
        question: 'What does Diana Reeves suggest companies are doing?',
        choices: [
          'Building new office towers in city centers',
          'Reducing office space and using coworking options',
          'Moving all employees to permanent remote work',
          'Increasing their investment in downtown properties'
        ],
        answer: 1,
        explanation: '「downsizing their traditional office footprint while investing in flexible coworking memberships」とオフィス縮小とコワーキング活用を述べています。'
      },
      {
        id: 39,
        question: 'What type of office buildings have the lowest vacancy rates?',
        choices: [
          'Suburban office parks',
          'Older downtown buildings',
          'Class A buildings in city centers',
          'Converted residential properties'
        ],
        answer: 2,
        explanation: '「Class A office buildings in city centers are faring better than older properties」とクラスAビルの空室率が低いと報告されています。'
      },
      {
        id: 40,
        question: 'When does the report expect vacancy rates to stabilize?',
        choices: [
          'By the end of 2025',
          'By mid-2026',
          'By 2027',
          'By 2030'
        ],
        answer: 2,
        explanation: '「office vacancy rates will stabilize by 2027」と2027年までに安定すると予測しています。'
      }
    ]
  },

  // ===== DOUBLE PASSAGE SETS (11-16): 5 questions each = 30 questions =====

  // Set 11: Email + Reply - Vendor Negotiation
  {
    id: 11,
    type: 'double',
    passages: [
      `To: Richard Tanaka, Procurement Manager\nFrom: Laura Chen, Apex Office Supplies\nDate: March 5\nSubject: Contract Renewal Proposal\n\nDear Mr. Tanaka,\n\nThank you for your continued partnership with Apex Office Supplies. As your current supply contract expires on March 31, I would like to present our renewal proposal.\n\nWe are pleased to offer a 3-year agreement with the following terms:\n- 8% discount on all standard office supplies (up from the current 5%)\n- Free delivery for orders over $200 (previously $300)\n- Dedicated account representative\n- 24-hour priority customer service line\n\nThe total estimated annual cost based on your purchasing history would be approximately $42,000, representing a savings of $4,500 compared to last year.\n\nI would be happy to schedule a meeting to discuss these terms. Please let me know your availability.\n\nBest regards,\nLaura Chen\nSenior Sales Representative, Apex Office Supplies`,

      `To: Laura Chen, Apex Office Supplies\nFrom: Richard Tanaka, Procurement Manager\nDate: March 8\nSubject: Re: Contract Renewal Proposal\n\nDear Ms. Chen,\n\nThank you for the proposal. We appreciate the improved discount and delivery threshold. However, I need to discuss a few points before we can proceed.\n\nFirst, we have received a competing offer from GreenLeaf Supplies with a 10% discount. While we value our relationship with Apex, we need to ensure we are getting the best value.\n\nSecond, we would like to include eco-friendly product options in the contract, as our company has adopted a sustainability policy this year. Could you provide a catalog of your green product line with pricing?\n\nFinally, could we consider a 2-year term instead of 3 years? This would give us more flexibility to reassess our needs.\n\nI am available for a meeting on March 12 or 13 in the afternoon.\n\nRegards,\nRichard Tanaka`
    ],
    questions: [
      {
        id: 41,
        question: 'What is the main reason Laura Chen is writing to Richard Tanaka?',
        choices: [
          'To apologize for a late delivery',
          'To introduce a new product line',
          'To propose renewing a supply contract',
          'To request payment for an overdue invoice'
        ],
        answer: 2,
        explanation: '契約更新の提案をするために連絡しています。'
      },
      {
        id: 42,
        question: 'How much would Apex\'s proposal save compared to the previous year?',
        choices: [
          '$2,500',
          '$4,200',
          '$4,500',
          '$42,000'
        ],
        answer: 2,
        explanation: '「a savings of $4,500 compared to last year」と$4,500の節約を見込んでいます。'
      },
      {
        id: 43,
        question: 'Why does Richard mention GreenLeaf Supplies?',
        choices: [
          'To recommend their products',
          'To negotiate a better discount from Apex',
          'To inform Laura that he has already signed with them',
          'To suggest a three-way partnership'
        ],
        answer: 1,
        explanation: '競合他社の割引率（10%）を引き合いに出して、より良い条件を引き出そうとしています。'
      },
      {
        id: 44,
        question: 'What new requirement does Richard\'s company have?',
        choices: [
          'Faster delivery times',
          'Lower minimum order quantities',
          'Environmentally friendly products',
          'A dedicated warehouse space'
        ],
        answer: 2,
        explanation: '「include eco-friendly product options」と環境に配慮した製品の追加を求めています。'
      },
      {
        id: 45,
        question: 'What change to the contract term does Richard request?',
        choices: [
          'He wants a 1-year contract',
          'He prefers a 2-year contract',
          'He requests a 5-year contract',
          'He wants a month-to-month arrangement'
        ],
        answer: 1,
        explanation: '「consider a 2-year term instead of 3 years」と2年契約への変更を希望しています。'
      }
    ]
  },

  // Set 12: Advertisement + Customer Review - Hotel
  {
    id: 12,
    type: 'double',
    passages: [
      `OCEANVIEW GRAND HOTEL — YOUR PERFECT GETAWAY\n\nExperience luxury at the Oceanview Grand Hotel, located just steps from Crystal Beach. Our newly renovated property features 200 elegantly appointed rooms and suites, each with a private balcony and ocean view.\n\nAmenities:\n- Infinity pool overlooking the Pacific Ocean\n- Full-service spa and wellness center\n- Three on-site restaurants including the award-winning Tidal Kitchen\n- Complimentary airport shuttle service\n- Free high-speed Wi-Fi\n- 24-hour concierge\n\nSpecial Spring Offer: Book by April 15 for stays between May 1 and June 30, and receive 25% off our standard rates. Children under 12 stay free when sharing a room with parents.\n\nReservations: www.oceanviewgrand.com or call (555) 234-5678`,

      `GUEST REVIEW — OCEANVIEW GRAND HOTEL\nReviewer: Margaret T. | Stayed: February 14-18 | Rating: ★★★★☆\n\nMy husband and I stayed at the Oceanview Grand for our anniversary. The room was beautiful with a stunning view, and the bed was incredibly comfortable. The infinity pool was as gorgeous as advertised.\n\nWe dined at the Tidal Kitchen twice and both meals were exceptional — the seafood platter is a must-try. The spa was also wonderful; I highly recommend the hot stone massage.\n\nHowever, two issues lowered my rating. First, the airport shuttle was 40 minutes late picking us up on arrival, which was frustrating after a long flight. Second, the Wi-Fi connection in our room was unreliable, dropping frequently during the evenings.\n\nOverall, a lovely hotel with great staff. The concierge, David, was especially helpful in arranging local tours. I would return, but I hope they improve the shuttle and internet services.`
    ],
    questions: [
      {
        id: 46,
        question: 'What special offer is currently available at the hotel?',
        choices: [
          'Free breakfast for all guests',
          'A 25% discount on spring bookings',
          'A complimentary spa treatment',
          'Upgrades to ocean-view suites'
        ],
        answer: 1,
        explanation: '「Book by April 15 for stays between May 1 and June 30, and receive 25% off」と春の25%割引が提供されています。'
      },
      {
        id: 47,
        question: 'What did Margaret especially enjoy at the hotel?',
        choices: [
          'The airport shuttle service',
          'The Wi-Fi speed',
          'The Tidal Kitchen restaurant',
          'The children\'s activities'
        ],
        answer: 2,
        explanation: '「dined at the Tidal Kitchen twice and both meals were exceptional」とTidal Kitchenでの食事を特に楽しんでいます。'
      },
      {
        id: 48,
        question: 'What problems did Margaret experience?',
        choices: [
          'A noisy room and cold pool',
          'A late shuttle and unreliable Wi-Fi',
          'Rude staff and overpriced meals',
          'A dirty room and broken air conditioning'
        ],
        answer: 1,
        explanation: '空港シャトルの遅延とWi-Fiの不安定さの2つの問題を挙げています。'
      },
      {
        id: 49,
        question: 'What is suggested about the concierge service?',
        choices: [
          'It is available only during business hours',
          'It requires an additional fee',
          'It was praised by the reviewer',
          'It was not used during Margaret\'s stay'
        ],
        answer: 2,
        explanation: 'コンシェルジュのDavidが地元ツアーの手配で特に親切だったと称賛しています。'
      },
      {
        id: 50,
        question: 'How long did Margaret stay at the hotel?',
        choices: [
          'Two nights',
          'Three nights',
          'Four nights',
          'Five nights'
        ],
        answer: 2,
        explanation: '「Stayed: February 14-18」で2月14日から18日まで、4泊の滞在です。'
      }
    ]
  },

  // Set 13: Memo + Schedule - Staff Training
  {
    id: 13,
    type: 'double',
    passages: [
      `MEMORANDUM\n\nTo: Customer Service Department Staff\nFrom: Janet Wu, Training Coordinator\nDate: April 1\nSubject: Mandatory Customer Service Excellence Training\n\nAll customer service representatives are required to complete the Customer Service Excellence Training program this month. This initiative is part of our company-wide effort to improve customer satisfaction scores, which dropped by 8% in Q1.\n\nThe training consists of three modules:\n1. Active Listening & Communication Skills (4 hours)\n2. Handling Difficult Customers (3 hours)\n3. Product Knowledge Update (2 hours)\n\nYou must complete all modules by April 30. Sessions are offered at multiple times to accommodate different schedules. Please sign up for your preferred sessions using the link in the attached schedule.\n\nEmployees who complete all three modules will receive a Certificate of Completion and will be eligible for the quarterly performance bonus. Failure to complete the training may affect your performance review.\n\nPlease contact me at j.wu@company.com if you have any scheduling conflicts.`,

      `CUSTOMER SERVICE EXCELLENCE TRAINING — APRIL SCHEDULE\n\nModule 1: Active Listening & Communication Skills\n- April 7 (Mon): 9:00 AM - 1:00 PM, Room 401\n- April 9 (Wed): 2:00 PM - 6:00 PM, Room 401\n- April 14 (Mon): 9:00 AM - 1:00 PM, Room 305\n\nModule 2: Handling Difficult Customers\n- April 10 (Thu): 10:00 AM - 1:00 PM, Room 401\n- April 16 (Wed): 2:00 PM - 5:00 PM, Room 305\n- April 22 (Tue): 9:00 AM - 12:00 PM, Room 401\n\nModule 3: Product Knowledge Update\n- April 17 (Thu): 3:00 PM - 5:00 PM, Room 305\n- April 24 (Thu): 10:00 AM - 12:00 PM, Room 401\n- April 28 (Mon): 1:00 PM - 3:00 PM, Room 305\n\nNote: Each session has a capacity of 20 participants. Please register early. Modules must be completed in numerical order.`
    ],
    questions: [
      {
        id: 51,
        question: 'Why is the training being organized?',
        choices: [
          'To prepare for a company merger',
          'To address declining customer satisfaction',
          'To train new employees',
          'To introduce a new product line'
        ],
        answer: 1,
        explanation: '「improve customer satisfaction scores, which dropped by 8% in Q1」と顧客満足度の低下に対応するためです。'
      },
      {
        id: 52,
        question: 'How many total hours of training are required?',
        choices: [
          '6 hours',
          '7 hours',
          '9 hours',
          '12 hours'
        ],
        answer: 2,
        explanation: 'モジュール1（4時間）+モジュール2（3時間）+モジュール3（2時間）= 合計9時間です。'
      },
      {
        id: 53,
        question: 'What incentive is offered for completing all modules?',
        choices: [
          'A salary increase',
          'An extra day off',
          'Eligibility for a performance bonus',
          'A promotion to team leader'
        ],
        answer: 2,
        explanation: '「will be eligible for the quarterly performance bonus」と四半期パフォーマンスボーナスの対象になります。'
      },
      {
        id: 54,
        question: 'What rule applies to the order of module completion?',
        choices: [
          'Any order is acceptable',
          'Modules must be completed in sequence',
          'Module 3 must be taken first',
          'Modules 1 and 2 can be taken simultaneously'
        ],
        answer: 1,
        explanation: '「Modules must be completed in numerical order」と番号順に完了する必要があります。'
      },
      {
        id: 55,
        question: 'If an employee attends Module 1 on April 9, what is the earliest they can take Module 2?',
        choices: [
          'April 10',
          'April 14',
          'April 16',
          'April 22'
        ],
        answer: 0,
        explanation: 'モジュール1を4月9日に受講すれば、翌日の4月10日にモジュール2を受けることができます。'
      }
    ]
  },

  // Set 14: Email + Web Page - Event Registration
  {
    id: 14,
    type: 'double',
    passages: [
      `To: All Staff\nFrom: Events Committee\nDate: March 20\nSubject: Annual Company Picnic — Registration Open\n\nDear Colleagues,\n\nWe are excited to announce that our Annual Company Picnic will be held on Saturday, April 26, at Lakeside Park from 11:00 AM to 5:00 PM.\n\nThis year's event will feature live music, a barbecue lunch, sports tournaments (volleyball, soccer, and tug-of-war), and activities for children including face painting and a bouncy castle.\n\nEmployees may bring up to 3 family members at no additional cost. Please register by April 18 through the company events portal so we can plan catering accordingly.\n\nVolunteers are needed to help with setup (8:00 - 11:00 AM) and cleanup (5:00 - 7:00 PM). Volunteers will receive a $25 gift card as a thank-you. Sign up on the portal if interested.\n\nWe look forward to a fun day together!\n\nThe Events Committee`,

      `COMPANY EVENTS PORTAL — PICNIC REGISTRATION\n\nAnnual Company Picnic | April 26 | Lakeside Park\n\nRegistration Form:\n- Employee Name: _______________\n- Department: _______________\n- Number of Guests (max 3): ___\n- Dietary Restrictions: [ ] Vegetarian [ ] Vegan [ ] Gluten-Free [ ] None [ ] Other: ___\n- Sports Tournament Sign-Up: [ ] Volleyball [ ] Soccer [ ] Tug-of-War\n- T-shirt Size (free event T-shirt): [ ] S [ ] M [ ] L [ ] XL\n- Volunteer: [ ] Setup (8-11 AM) [ ] Cleanup (5-7 PM)\n\nImportant Notes:\n- Registration deadline: April 18\n- In case of rain, the event will be moved to the Greenfield Community Center\n- Parking is available at Lot B (free) and Lot C ($5)\n- No alcohol is permitted at the venue\n- Attendees are encouraged to bring sunscreen and outdoor seating\n\nContact: events@company.com | Questions? Call ext. 2200`
    ],
    questions: [
      {
        id: 56,
        question: 'How many guests can each employee bring?',
        choices: [
          'One',
          'Two',
          'Three',
          'Unlimited'
        ],
        answer: 2,
        explanation: '「Employees may bring up to 3 family members」と最大3名の家族を同伴できます。'
      },
      {
        id: 57,
        question: 'What will volunteers receive for their help?',
        choices: [
          'An extra vacation day',
          'A free lunch',
          'A $25 gift card',
          'A company T-shirt'
        ],
        answer: 2,
        explanation: '「Volunteers will receive a $25 gift card as a thank-you」と$25のギフトカードが提供されます。'
      },
      {
        id: 58,
        question: 'What will happen if it rains on the day of the picnic?',
        choices: [
          'The event will be canceled',
          'It will be postponed to the following week',
          'It will move to an indoor facility',
          'Only indoor activities will be available'
        ],
        answer: 2,
        explanation: '「the event will be moved to the Greenfield Community Center」と屋内施設に移動します。'
      },
      {
        id: 59,
        question: 'What is NOT allowed at the picnic venue?',
        choices: [
          'Outside food',
          'Children\'s activities',
          'Alcohol',
          'Personal seating'
        ],
        answer: 2,
        explanation: '「No alcohol is permitted at the venue」とアルコールは会場で禁止されています。'
      },
      {
        id: 60,
        question: 'What free item will registered attendees receive?',
        choices: [
          'A hat',
          'A water bottle',
          'A T-shirt',
          'A tote bag'
        ],
        answer: 2,
        explanation: '登録フォームに「free event T-shirt」とサイズ選択があり、無料のTシャツが配布されます。'
      }
    ]
  },

  // Set 15: Notice + Email - Policy Change
  {
    id: 15,
    type: 'double',
    passages: [
      `NOTICE: UPDATED PARKING POLICY\nEffective May 1, 2026\n\nDue to the ongoing construction of the new East Wing, parking availability at the Westfield Corporate Campus will be reduced for approximately six months. The following changes will take effect:\n\n1. Lot A (closest to the main entrance) will be reserved for visitors and clients only.\n2. Employee parking will be available in Lots B, C, and the new temporary Lot D (south of the campus).\n3. A free shuttle bus will run every 10 minutes between Lot D and the main entrance from 7:00 AM to 7:00 PM.\n4. Employees are encouraged to use carpooling. Carpool groups of 3 or more will receive priority parking in Lot B.\n5. Bicycle parking has been expanded, and employees who cycle to work will receive a $50 monthly transportation credit.\n\nWe appreciate your patience during this construction period. For questions, contact Facilities at facilities@westfield.com.`,

      `To: David Park, Facilities Manager\nFrom: Karen Lee, Marketing Department\nDate: April 22\nSubject: Parking Policy Questions\n\nHi David,\n\nI read the updated parking notice and have a few questions.\n\nFirst, I currently have a reserved spot in Lot A due to my mobility limitation. Will accommodations be made for employees with disabilities?\n\nSecond, I often meet with external clients who visit our office. Will there be a way to pre-register their vehicles so they can access Lot A without delays at the security gate?\n\nThird, my colleague and I have been carpooling together. Does a group of two qualify for the priority parking benefit, or does it strictly require three people?\n\nFinally, is there a timeline for when the East Wing construction will be completed and normal parking will resume?\n\nThank you for your help.\n\nKaren Lee`
    ],
    questions: [
      {
        id: 61,
        question: 'Why is the parking policy changing?',
        choices: [
          'The company is reducing costs',
          'A new building is being constructed',
          'Employee numbers have increased significantly',
          'The current parking lots need repaving'
        ],
        answer: 1,
        explanation: '「Due to the ongoing construction of the new East Wing」と新棟の建設工事が原因です。'
      },
      {
        id: 62,
        question: 'What incentive is offered to employees who ride bicycles?',
        choices: [
          'Free bike maintenance',
          'Priority parking',
          'A monthly $50 credit',
          'A free bicycle'
        ],
        answer: 2,
        explanation: '「employees who cycle to work will receive a $50 monthly transportation credit」と月$50の交通クレジットが提供されます。'
      },
      {
        id: 63,
        question: 'What concern does Karen have about her personal situation?',
        choices: [
          'She cannot afford the parking fees',
          'She needs accessible parking due to a disability',
          'She does not know how to use the shuttle bus',
          'She is worried about construction noise'
        ],
        answer: 1,
        explanation: '「mobility limitation」のためLot Aの専用スペースが必要であることを心配しています。'
      },
      {
        id: 64,
        question: 'How often does the shuttle bus run from Lot D?',
        choices: [
          'Every 5 minutes',
          'Every 10 minutes',
          'Every 15 minutes',
          'Every 30 minutes'
        ],
        answer: 1,
        explanation: '「A free shuttle bus will run every 10 minutes」と10分間隔で運行されます。'
      },
      {
        id: 65,
        question: 'What does Karen want to know about the carpool benefit?',
        choices: [
          'Whether two people qualify for priority parking',
          'Whether carpool drivers get free fuel',
          'How to register a carpool group',
          'Where carpool vehicles should park'
        ],
        answer: 0,
        explanation: '「Does a group of two qualify for the priority parking benefit」と2人でも優先駐車の対象になるか質問しています。'
      }
    ]
  },

  // Set 16: Article + Chart Description - Business Report
  {
    id: 16,
    type: 'double',
    passages: [
      `GLOBAL GREEN ENERGY INVESTMENTS SURGE IN 2025\nEnergy Business Quarterly | February 2026\n\nGlobal investment in renewable energy reached a record $485 billion in 2025, a 12% increase from the previous year, according to data released by the International Clean Energy Agency (ICEA). Solar energy led the growth, attracting $210 billion in investment, followed by wind energy at $155 billion.\n\nAsia-Pacific was the largest regional market, accounting for 42% of total global investment. Europe followed with 28%, while North America represented 18%. The remaining 12% was distributed among other regions.\n\n"The clean energy transition is accelerating faster than many predicted," said ICEA Director Thomas Eriksson. "Government policies, falling technology costs, and corporate sustainability commitments are all driving this momentum."\n\nNotably, battery storage technology investment doubled year-over-year to $45 billion, reflecting growing recognition of the need for grid stability as variable renewable sources expand.`,

      `ICEA 2025 RENEWABLE ENERGY INVESTMENT SUMMARY\n\nTotal Global Investment: $485 billion (+12% vs. 2024)\n\nBy Technology:\n- Solar: $210 billion (43%)\n- Wind: $155 billion (32%)\n- Battery Storage: $45 billion (9%)\n- Hydropower: $40 billion (8%)\n- Other (geothermal, biomass, etc.): $35 billion (7%)\n\nBy Region:\n- Asia-Pacific: $203.7 billion (42%)\n- Europe: $135.8 billion (28%)\n- North America: $87.3 billion (18%)\n- Rest of World: $58.2 billion (12%)\n\nKey Trends:\n- Solar installation costs fell 8% compared to 2024\n- Offshore wind capacity grew by 25%\n- 15 countries announced new net-zero targets\n- Corporate renewable energy purchases hit record levels`
    ],
    questions: [
      {
        id: 66,
        question: 'How much did global renewable energy investment increase in 2025?',
        choices: [
          '8%',
          '12%',
          '18%',
          '25%'
        ],
        answer: 1,
        explanation: '「a 12% increase from the previous year」と前年比12%増加しました。'
      },
      {
        id: 67,
        question: 'Which energy source received the most investment?',
        choices: [
          'Wind energy',
          'Battery storage',
          'Hydropower',
          'Solar energy'
        ],
        answer: 3,
        explanation: '太陽光エネルギーが$210 billion（43%）で最大の投資を受けました。'
      },
      {
        id: 68,
        question: 'What is notable about battery storage investment?',
        choices: [
          'It decreased significantly',
          'It doubled compared to the previous year',
          'It surpassed wind energy investment',
          'It was concentrated in North America'
        ],
        answer: 1,
        explanation: '「battery storage technology investment doubled year-over-year」と前年比で倍増しました。'
      },
      {
        id: 69,
        question: 'According to Thomas Eriksson, what is driving the growth?',
        choices: [
          'Population growth and urbanization',
          'Government policies and declining technology costs',
          'International trade agreements',
          'Consumer demand for electric vehicles'
        ],
        answer: 1,
        explanation: '「Government policies, falling technology costs, and corporate sustainability commitments」が推進力として挙げられています。'
      },
      {
        id: 70,
        question: 'Which region had the second-highest investment?',
        choices: [
          'Asia-Pacific',
          'North America',
          'Europe',
          'Rest of World'
        ],
        answer: 2,
        explanation: 'ヨーロッパが$135.8 billion（28%）で2番目に大きな投資地域でした。'
      }
    ]
  },

  // ===== TRIPLE PASSAGE SETS (17-20): 7-8 questions each = 30 questions =====

  // Set 17: Job Posting + Cover Letter + Interview Schedule (8 questions)
  {
    id: 17,
    type: 'triple',
    passages: [
      `STRATTON & ASSOCIATES — NOW HIRING\n\nPosition: Junior Financial Analyst\nLocation: Chicago, IL\nDepartment: Corporate Finance\nType: Full-time\n\nStratton & Associates, a leading financial advisory firm, is seeking a Junior Financial Analyst to support our corporate finance team. The successful candidate will assist in financial modeling, data analysis, and preparation of client presentations.\n\nRequirements:\n- Bachelor's degree in Finance, Accounting, or Economics\n- Strong proficiency in Microsoft Excel and financial modeling\n- Excellent analytical and problem-solving skills\n- CFA Level 1 candidacy is a plus\n\nBenefits include competitive salary, annual bonus, health insurance, and a CFA exam preparation program. Applications are accepted through April 15.`,

      `Dear Hiring Manager,\n\nI am writing to apply for the Junior Financial Analyst position at Stratton & Associates, as advertised on your company website.\n\nI recently graduated from Northwestern University with a Bachelor of Science in Finance, magna cum laude. During my studies, I completed a six-month internship at Meridian Capital, where I assisted the corporate finance team with financial modeling and valuation analysis for M&A transactions. I also served as treasurer of the university's Investment Club, managing a student portfolio of $50,000.\n\nI am proficient in Excel, including advanced functions such as VBA macros and pivot tables. I am currently studying for the CFA Level 1 exam, which I plan to take in June.\n\nI am drawn to Stratton & Associates because of your reputation for mentoring junior professionals and your diverse client base. I am confident that my academic background and internship experience make me a strong candidate.\n\nI have attached my resume and am available for an interview at your convenience.\n\nSincerely,\nMichael Torres`,

      `INTERVIEW SCHEDULE — JUNIOR FINANCIAL ANALYST CANDIDATES\nDate: April 22 | Location: Stratton & Associates, 15th Floor Conference Room\n\n9:00 - 9:45 AM    Candidate: Sarah Kim\n                   Interviewer: Robert Yang (VP, Corporate Finance)\n\n10:00 - 10:45 AM   Candidate: Michael Torres\n                   Interviewer: Robert Yang (VP, Corporate Finance)\n\n11:00 - 11:45 AM   Candidate: James Patel\n                   Interviewer: Lisa Nguyen (Director, HR)\n\n1:00 - 1:45 PM     Candidate: Emily Watson\n                   Interviewer: Robert Yang (VP, Corporate Finance)\n\n2:00 - 2:45 PM     Second-round panel interview (if applicable)\n                   Panel: Robert Yang, Lisa Nguyen, CFO Patricia Adams\n\nNote: Candidates should bring a valid photo ID and two copies of their resume. Business formal attire is required.`
    ],
    questions: [
      {
        id: 71,
        question: 'What qualification does the job posting list as advantageous but not required?',
        choices: [
          'A master\'s degree in Finance',
          'CFA Level 1 candidacy',
          'Three years of work experience',
          'Proficiency in Python programming'
        ],
        answer: 1,
        explanation: '「CFA Level 1 candidacy is a plus」とCFA Level 1は必須ではなくプラス要素として記載されています。'
      },
      {
        id: 72,
        question: 'Where did Michael Torres complete his internship?',
        choices: [
          'Stratton & Associates',
          'Northwestern University',
          'Meridian Capital',
          'Goldman Sachs'
        ],
        answer: 2,
        explanation: '「I completed a six-month internship at Meridian Capital」とMeridian Capitalでインターンを行いました。'
      },
      {
        id: 73,
        question: 'What does Michael mention about his CFA status?',
        choices: [
          'He has already passed Level 1',
          'He is currently preparing for the Level 1 exam',
          'He plans to start studying next year',
          'He is not interested in the CFA program'
        ],
        answer: 1,
        explanation: '「I am currently studying for the CFA Level 1 exam」と現在Level 1の勉強中です。'
      },
      {
        id: 74,
        question: 'How many candidates are scheduled for interviews?',
        choices: [
          'Two',
          'Three',
          'Four',
          'Five'
        ],
        answer: 2,
        explanation: 'Sarah Kim、Michael Torres、James Patel、Emily Watsonの4名が面接予定です。'
      },
      {
        id: 75,
        question: 'Who will likely conduct Michael Torres\'s first interview?',
        choices: [
          'Lisa Nguyen',
          'Patricia Adams',
          'Robert Yang',
          'The entire panel'
        ],
        answer: 2,
        explanation: 'Michaelの面接官はRobert Yang（VP, Corporate Finance）と予定されています。'
      },
      {
        id: 76,
        question: 'What is the purpose of the 2:00 PM time slot?',
        choices: [
          'A group interview for all candidates',
          'A second-round interview if needed',
          'A presentation by the CFO',
          'A tour of the office'
        ],
        answer: 1,
        explanation: '「Second-round panel interview (if applicable)」と必要に応じた二次面接の枠です。'
      },
      {
        id: 77,
        question: 'What attracts Michael to Stratton & Associates?',
        choices: [
          'The high starting salary',
          'The office location in Chicago',
          'The mentoring culture and client diversity',
          'A recommendation from a professor'
        ],
        answer: 2,
        explanation: '「reputation for mentoring junior professionals and your diverse client base」とメンタリング文化と多様なクライアント基盤に惹かれています。'
      },
      {
        id: 78,
        question: 'What should candidates bring to the interview?',
        choices: [
          'A laptop and presentation materials',
          'A photo ID and resume copies',
          'Letters of recommendation',
          'A completed application form'
        ],
        answer: 1,
        explanation: '「bring a valid photo ID and two copies of their resume」と写真付きIDと履歴書2部を持参する必要があります。'
      }
    ]
  },

  // Set 18: Email Thread + Website FAQ (8 questions)
  {
    id: 18,
    type: 'triple',
    passages: [
      `To: TechServe Customer Support\nFrom: Yuki Nakamura\nDate: March 10\nSubject: Laptop Repair Inquiry\n\nHello,\n\nI purchased a TechServe ProBook 15 laptop (Model #TS-PB15) on September 5, 2025. Recently, the screen has developed a flickering issue that worsens over time. The laptop is still under the standard one-year warranty.\n\nCould you please let me know how to proceed with a repair or replacement? I rely on this laptop for my work and would like to resolve this as quickly as possible.\n\nOrder Number: TS-2025-44892\n\nThank you,\nYuki Nakamura`,

      `To: Yuki Nakamura\nFrom: TechServe Customer Support\nDate: March 11\nSubject: Re: Laptop Repair Inquiry — Case #CS-78234\n\nDear Ms. Nakamura,\n\nThank you for contacting TechServe. I'm sorry to hear about the issue with your ProBook 15.\n\nI've verified that your laptop is covered under our standard warranty until September 5, 2026. Screen flickering is a known issue with a small batch of ProBook 15 units manufactured before October 2025, and we have issued a recall for affected models.\n\nYou have two options:\n1. Mail-in Repair: Ship your laptop to our service center using a prepaid shipping label (we'll email this to you). Estimated turnaround: 7-10 business days.\n2. In-Store Repair: Visit any authorized TechServe service center. Estimated same-day or next-day turnaround.\n\nAs a goodwill gesture, we will also extend your warranty by an additional 6 months.\n\nPlease reply with your preferred option or visit our FAQ page at www.techserve.com/support/faq for more details.\n\nBest regards,\nAlex Fernandez\nTechServe Customer Support`,

      `TECHSERVE SUPPORT FAQ\n\nQ: What does the standard warranty cover?\nA: The standard warranty covers manufacturing defects in hardware and components for 12 months from the date of purchase. It does not cover accidental damage, liquid spills, or software-related issues.\n\nQ: How do I find an authorized service center?\nA: Visit www.techserve.com/service-locator and enter your zip code. We have over 200 locations nationwide.\n\nQ: Can I get a replacement instead of a repair?\nA: If the repair cannot be completed within 15 business days or the same issue recurs three times, you may be eligible for a full replacement under our Satisfaction Guarantee policy.\n\nQ: What should I back up before sending my laptop for repair?\nA: We recommend backing up all personal data before submitting your device. TechServe is not responsible for data loss during repairs.\n\nQ: Is there a fee for warranty repairs?\nA: No. All repairs covered under warranty are free of charge, including parts and labor.\n\nQ: How do I track my repair status?\nA: Log in to your TechServe account and navigate to "My Repairs" to view real-time status updates.`
    ],
    questions: [
      {
        id: 79,
        question: 'What problem is Yuki experiencing with her laptop?',
        choices: [
          'The battery drains too quickly',
          'The keyboard is not responding',
          'The screen is flickering',
          'The laptop overheats frequently'
        ],
        answer: 2,
        explanation: '「the screen has developed a flickering issue」と画面のちらつき問題を報告しています。'
      },
      {
        id: 80,
        question: 'Why does Alex say the issue is well-known?',
        choices: [
          'It was reported by many reviewers online',
          'It affects a specific batch of laptops',
          'The company issued a software update for it',
          'It is caused by a common user error'
        ],
        answer: 1,
        explanation: '「a known issue with a small batch of ProBook 15 units manufactured before October 2025」と特定のバッチに影響する既知の問題です。'
      },
      {
        id: 81,
        question: 'What additional benefit will Yuki receive?',
        choices: [
          'A free laptop bag',
          'A discount on her next purchase',
          'A 6-month warranty extension',
          'Free software upgrades for one year'
        ],
        answer: 2,
        explanation: '「extend your warranty by an additional 6 months」と6か月の保証延長が提供されます。'
      },
      {
        id: 82,
        question: 'How long is the estimated turnaround for mail-in repair?',
        choices: [
          '1-3 business days',
          '5-7 business days',
          '7-10 business days',
          '15-20 business days'
        ],
        answer: 2,
        explanation: '「Mail-in Repair...Estimated turnaround: 7-10 business days」と7〜10営業日です。'
      },
      {
        id: 83,
        question: 'Under what condition can a customer receive a replacement device?',
        choices: [
          'If the laptop is more than one year old',
          'If the repair takes more than 15 business days or the issue occurs three times',
          'If the customer requests it within 30 days of purchase',
          'If the repair cost exceeds $500'
        ],
        answer: 1,
        explanation: 'FAQ に「repair cannot be completed within 15 business days or the same issue recurs three times」と記載されています。'
      },
      {
        id: 84,
        question: 'What does the FAQ recommend before sending a device for repair?',
        choices: [
          'Removing all accessories',
          'Updating to the latest software',
          'Backing up personal data',
          'Taking photos of the device'
        ],
        answer: 2,
        explanation: '「recommend backing up all personal data before submitting your device」と個人データのバックアップを推奨しています。'
      },
      {
        id: 85,
        question: 'When does Yuki\'s original warranty expire?',
        choices: [
          'March 10, 2026',
          'September 5, 2026',
          'March 11, 2027',
          'September 5, 2027'
        ],
        answer: 1,
        explanation: '購入日が2025年9月5日で、12か月の標準保証なので2026年9月5日に失効します。'
      },
      {
        id: 86,
        question: 'What is NOT covered by the standard warranty?',
        choices: [
          'Manufacturing defects',
          'Hardware component failures',
          'Accidental physical damage',
          'Screen flickering from production issues'
        ],
        answer: 2,
        explanation: 'FAQ に「does not cover accidental damage, liquid spills, or software-related issues」と偶発的な損傷は対象外です。'
      }
    ]
  },

  // Set 19: Invitation + Venue Info + Email Reply (7 questions)
  {
    id: 19,
    type: 'triple',
    passages: [
      `INVITATION\n\nThe Westbrook Chamber of Commerce\ncordially invites you to the\n\n12th Annual Business Excellence Awards Gala\n\nDate: Saturday, May 10, 2026\nTime: 6:30 PM — Cocktail Reception\n       7:30 PM — Dinner & Awards Ceremony\nVenue: The Grand Meridian Hotel, Crystal Ballroom\nDress Code: Black Tie\n\nThis year, we will honor outstanding businesses and leaders in five categories: Innovation, Community Impact, Small Business of the Year, Sustainability, and Lifetime Achievement.\n\nTickets: $150 per person / $1,200 for a table of 10\nEarly bird: 20% off if purchased before April 10\n\nProceeds benefit the Westbrook Youth Entrepreneurship Program.\n\nRSVP by April 25 at www.westbrookchamber.org/gala\nFor sponsorship opportunities, contact events@westbrookchamber.org`,

      `THE GRAND MERIDIAN HOTEL\n\nEvent Venue: Crystal Ballroom\nCapacity: Up to 300 guests (seated dinner)\nLocation: 500 Grand Avenue, Westbrook\n\nFacilities:\n- Full-service catering with customizable menus\n- State-of-the-art audio/visual equipment\n- Complimentary coat check\n- Valet parking available ($15 per vehicle)\n- Self-parking in the hotel garage ($8 per vehicle)\n\nAccessibility: The Crystal Ballroom is wheelchair accessible. An elevator provides direct access from the lobby. Hearing loop systems are available upon request.\n\nNearby Accommodations: Gala attendees receive a special room rate of $189/night (regularly $249) when booking with code GALA2026. Reservations: (555) 678-9012.\n\nThe hotel is located two blocks from Westbrook Central Station (Metro Blue Line).`,

      `To: Events Committee, Westbrook Chamber of Commerce\nFrom: Sandra Brooks, CEO, Brooks Design Studio\nDate: April 5\nSubject: Gala Attendance and Sponsorship\n\nDear Events Committee,\n\nThank you for the invitation to the Business Excellence Awards Gala. I am delighted to confirm attendance and would like to reserve a table of 10.\n\nAdditionally, Brooks Design Studio would like to serve as a Gold Sponsor for this year's event. Please send me the sponsorship package details and benefits at your earliest convenience.\n\nI also wanted to mention that two of my guests use wheelchairs. Could you confirm that the venue is fully accessible and that appropriate seating arrangements can be made?\n\nFinally, several of us will be traveling from out of town. Is there a discounted hotel rate for gala attendees?\n\nI look forward to a wonderful evening.\n\nWarm regards,\nSandra Brooks`
    ],
    questions: [
      {
        id: 87,
        question: 'How much would Sandra pay for her table if she books before April 10?',
        choices: [
          '$960',
          '$1,000',
          '$1,200',
          '$1,500'
        ],
        answer: 0,
        explanation: 'テーブル価格$1,200に20%の早期割引が適用され、$1,200 × 0.80 = $960です。'
      },
      {
        id: 88,
        question: 'What will the gala proceeds be used for?',
        choices: [
          'Renovating the Chamber of Commerce building',
          'Funding a youth entrepreneurship program',
          'Supporting local hospital expansion',
          'Creating a business incubator space'
        ],
        answer: 1,
        explanation: '「Proceeds benefit the Westbrook Youth Entrepreneurship Program」と青少年起業プログラムの支援に使われます。'
      },
      {
        id: 89,
        question: 'What is the special hotel rate for gala attendees?',
        choices: [
          '$150 per night',
          '$189 per night',
          '$200 per night',
          '$249 per night'
        ],
        answer: 1,
        explanation: '「special room rate of $189/night」とガラ参加者向けの特別料金は$189です。'
      },
      {
        id: 90,
        question: 'What concern does Sandra raise about the venue?',
        choices: [
          'Whether there is enough parking',
          'Whether the menu can accommodate dietary needs',
          'Whether wheelchair access is available',
          'Whether the event will be broadcast online'
        ],
        answer: 2,
        explanation: '車椅子を使用するゲストがいるため、バリアフリー対応について確認しています。'
      },
      {
        id: 91,
        question: 'How can guests reach the hotel by public transportation?',
        choices: [
          'By taking a shuttle from the airport',
          'By using the Metro Blue Line to Westbrook Central Station',
          'By taking a ferry to Westbrook Pier',
          'There is no public transportation option mentioned'
        ],
        answer: 1,
        explanation: '「two blocks from Westbrook Central Station (Metro Blue Line)」とメトロブルーラインの駅から徒歩2ブロックです。'
      },
      {
        id: 92,
        question: 'What does Sandra want in addition to attending the gala?',
        choices: [
          'To nominate a candidate for an award',
          'To give a keynote speech',
          'To become a Gold Sponsor',
          'To volunteer at the event'
        ],
        answer: 2,
        explanation: '「Brooks Design Studio would like to serve as a Gold Sponsor」とゴールドスポンサーになることを希望しています。'
      },
      {
        id: 93,
        question: 'What accessibility feature is available at the venue upon request?',
        choices: [
          'Sign language interpreters',
          'Braille menus',
          'Hearing loop systems',
          'Reserved front-row seating'
        ],
        answer: 2,
        explanation: '「Hearing loop systems are available upon request」とヒアリングループが要請に応じて利用可能です。'
      }
    ]
  },

  // Set 20: Newsletter + Company Website + Employee Email (7 questions)
  {
    id: 20,
    type: 'triple',
    passages: [
      `PINNACLE TECHNOLOGIES — QUARTERLY NEWSLETTER\nQ1 2026 | Issue #42\n\nCOMPANY HIGHLIGHTS\n\nWe are thrilled to announce that Pinnacle Technologies has been named one of the "Top 50 Best Places to Work" by Corporate Excellence Magazine for the third consecutive year. This recognition reflects our commitment to employee well-being, innovation, and collaborative culture.\n\nOther key developments this quarter:\n- Launch of PinnacleCloud 3.0, our next-generation cloud platform\n- Opening of a new R&D center in Austin, Texas (120 positions to be filled by Q3)\n- Partnership with GreenTech Innovations for sustainable data center operations\n- Record quarterly revenue of $892 million, up 18% year-over-year\n\nUPCOMING EVENTS\n- April 22: Company-wide Town Hall (virtual, 2:00 PM ET)\n- May 5-7: PinnacleCon 2026, our annual technology conference in San Francisco\n- June 1: Volunteer Day — employees receive a paid day off to volunteer`,

      `PINNACLE TECHNOLOGIES — CAREERS PAGE\n\nJoin Our Growing Team!\n\nPinnacle Technologies is expanding, and we're looking for talented individuals to help shape the future of cloud computing.\n\nCurrent Openings at Our New Austin R&D Center:\n\n1. Senior Cloud Architect — Lead the design of scalable cloud infrastructure. Requires 7+ years experience. Salary: $160,000 - $195,000.\n\n2. Machine Learning Engineer — Develop AI-powered solutions for our cloud platform. Requires PhD or 5+ years experience. Salary: $145,000 - $180,000.\n\n3. DevOps Engineer — Manage CI/CD pipelines and deployment automation. Requires 3+ years experience. Salary: $110,000 - $140,000.\n\n4. UX Designer — Create intuitive interfaces for enterprise software. Requires 4+ years experience. Salary: $105,000 - $130,000.\n\nAll positions include comprehensive benefits: health/dental/vision insurance, 401(k) with 8% match, stock options, unlimited PTO, and relocation assistance for the Austin office.\n\nApply at careers.pinnacletech.com`,

      `To: HR Department\nFrom: Daniel Kim, Software Engineering Team Lead\nDate: March 28\nSubject: Internal Transfer Request\n\nDear HR Team,\n\nI am writing to express my interest in transferring to the new Austin R&D center. I have been with Pinnacle Technologies for four years in the San Francisco office and am excited about the opportunity to contribute to the new facility's growth.\n\nSpecifically, I am interested in the Senior Cloud Architect position. I have seven years of total experience in cloud infrastructure, including my current role leading a team of eight engineers working on PinnacleCloud. I hold AWS and Azure certifications and have been deeply involved in the PinnacleCloud 3.0 launch.\n\nI have discussed this with my current manager, who supports my transfer. My wife and I have family in Austin, which is an additional motivation for the move.\n\nI would appreciate information about the internal transfer process, timeline, and whether the relocation assistance package applies to internal transfers as well.\n\nThank you for your consideration.\n\nBest regards,\nDaniel Kim`
    ],
    questions: [
      {
        id: 94,
        question: 'How many consecutive years has Pinnacle been on the "Best Places to Work" list?',
        choices: [
          'One year',
          'Two years',
          'Three years',
          'Four years'
        ],
        answer: 2,
        explanation: '「for the third consecutive year」と3年連続で選出されています。'
      },
      {
        id: 95,
        question: 'What is the company\'s quarterly revenue growth rate?',
        choices: [
          '8%',
          '12%',
          '15%',
          '18%'
        ],
        answer: 3,
        explanation: '「Record quarterly revenue of $892 million, up 18% year-over-year」と前年比18%増です。'
      },
      {
        id: 96,
        question: 'Which position is Daniel Kim interested in?',
        choices: [
          'Machine Learning Engineer',
          'DevOps Engineer',
          'Senior Cloud Architect',
          'UX Designer'
        ],
        answer: 2,
        explanation: '「I am interested in the Senior Cloud Architect position」とシニアクラウドアーキテクトに興味を示しています。'
      },
      {
        id: 97,
        question: 'Does Daniel meet the experience requirement for his desired position?',
        choices: [
          'No, he lacks the required experience',
          'Yes, he has exactly the minimum required experience',
          'Yes, he exceeds the minimum requirement',
          'The requirement is not specified'
        ],
        answer: 1,
        explanation: '求人は7年以上の経験を要求し、Danielは「seven years of total experience」とちょうど最低要件を満たしています。'
      },
      {
        id: 98,
        question: 'What additional reason does Daniel have for wanting to move to Austin?',
        choices: [
          'He wants a higher salary',
          'He prefers a warmer climate',
          'He has family members there',
          'He wants to attend PinnacleCon'
        ],
        answer: 2,
        explanation: '「My wife and I have family in Austin」とオースティンに家族がいることを理由に挙げています。'
      },
      {
        id: 99,
        question: 'What benefit does Pinnacle offer that is unusual among employers?',
        choices: [
          'Free lunch every day',
          'A company car',
          'Unlimited paid time off',
          'An on-site daycare center'
        ],
        answer: 2,
        explanation: '福利厚生に「unlimited PTO」（無制限の有給休暇）が含まれており、比較的珍しい制度です。'
      },
      {
        id: 100,
        question: 'What question does Daniel specifically ask HR about?',
        choices: [
          'Whether the salary can be negotiated',
          'Whether relocation assistance is available for internal transfers',
          'Whether he can work remotely from Austin',
          'Whether his team can transfer with him'
        ],
        answer: 1,
        explanation: '「whether the relocation assistance package applies to internal transfers」と社内異動にも引越支援が適用されるか確認しています。'
      }
    ]
  }
];
