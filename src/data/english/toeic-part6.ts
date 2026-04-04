import { ToeicPart6Set } from './types';

export const toeicPart6Questions: ToeicPart6Set[] = [
  // ===== SET 1: Office Email about Meeting =====
  {
    id: 1,
    passage: `To: All Department Managers\nFrom: Sarah Collins, VP of Operations\nSubject: Quarterly Review Meeting\n\nDear Managers,\n\nI am writing to (1)______ you that the quarterly review meeting has been rescheduled from March 15 to March 22. The meeting will take place in Conference Room A on the third floor. Please make sure to bring all relevant sales data and performance reports.\n\nDue to the (2)______ number of agenda items, the meeting is expected to last approximately three hours. Lunch will be (3)______ for all attendees in the adjacent break room.\n\n(4)______ If you have any questions, please do not hesitate to contact my assistant, Tom Reed, at extension 4502.\n\nBest regards,\nSarah Collins`,
    questions: [
      {
        id: 1,
        blankNumber: 1,
        choices: ['inform', 'say', 'speak', 'talk'],
        answer: 0,
        explanation: '「inform + 人 + that節」で「～に…を通知する」。ビジネスメールの定型表現。'
      },
      {
        id: 2,
        blankNumber: 2,
        choices: ['large', 'largely', 'larger', 'largest'],
        answer: 0,
        explanation: '名詞 number を修飾する形容詞が必要。large number of ～で「多数の～」。'
      },
      {
        id: 3,
        blankNumber: 3,
        choices: ['provided', 'offering', 'catered', 'given'],
        answer: 0,
        explanation: '「Lunch will be provided」で「昼食が提供される」。受動態の文脈に合う。'
      },
      {
        id: 4,
        blankNumber: 4,
        choices: [
          'Please confirm your attendance by March 18.',
          'The cafeteria serves lunch from noon to 1 P.M.',
          'Sarah Collins joined the company last year.',
          'The third floor was recently renovated.'
        ],
        answer: 0,
        explanation: '会議の出欠確認を求める文が文脈に最も適切。'
      }
    ]
  },

  // ===== SET 2: Job Advertisement =====
  {
    id: 2,
    passage: `HELP WANTED — Marketing Coordinator\n\nBrightPath Solutions is seeking a highly motivated Marketing Coordinator to join our growing team. The ideal candidate will have at least three years of (1)______ in digital marketing, including social media management and content creation.\n\nResponsibilities include developing marketing campaigns, (2)______ market research, and preparing monthly performance reports. The position requires strong communication skills and the ability to work (3)______ under pressure.\n\nWe offer a competitive salary, comprehensive health benefits, and opportunities for professional development. (4)______\n\nTo apply, please submit your resume and cover letter to careers@brightpath.com by April 30.`,
    questions: [
      {
        id: 5,
        blankNumber: 1,
        choices: ['experience', 'experiment', 'expertise', 'expectation'],
        answer: 0,
        explanation: '「experience in ～」で「～における経験」。求人広告でよく使われる表現。'
      },
      {
        id: 6,
        blankNumber: 2,
        choices: ['conducting', 'conducted', 'conduct', 'to have conducted'],
        answer: 0,
        explanation: '前の developing と並列の動名詞形が必要。'
      },
      {
        id: 7,
        blankNumber: 3,
        choices: ['effectively', 'effective', 'effect', 'effecting'],
        answer: 0,
        explanation: '動詞 work を修飾する副詞が必要。'
      },
      {
        id: 8,
        blankNumber: 4,
        choices: [
          'Remote work options are available two days per week.',
          'The company was founded in 1985.',
          'Our main office is located downtown.',
          'Marketing budgets have increased this year.'
        ],
        answer: 0,
        explanation: '福利厚生の説明の流れで、リモートワークの選択肢を追加する文が最も適切。'
      }
    ]
  },

  // ===== SET 3: Company Memo about Policy Change =====
  {
    id: 3,
    passage: `MEMORANDUM\n\nTo: All Employees\nFrom: Human Resources Department\nDate: January 10\nRe: Updated Travel Expense Policy\n\nEffective February 1, the company will implement a revised travel expense policy. All employees who travel for business purposes must submit their expense reports (1)______ 10 business days of returning from their trip.\n\nReceipts are required for any individual expense (2)______ $25. Meal allowances will be capped at $75 per day for domestic travel and $100 per day for international travel.\n\n(3)______ Employees who fail to comply with the new guidelines may experience delays in reimbursement.\n\nFor a complete copy of the updated policy, please visit the HR portal or contact the Human Resources Department at (4)______ 3200.`,
    questions: [
      {
        id: 9,
        blankNumber: 1,
        choices: ['within', 'during', 'between', 'until'],
        answer: 0,
        explanation: '「within 10 business days」で「10営業日以内に」。期間を表す前置詞。'
      },
      {
        id: 10,
        blankNumber: 2,
        choices: ['exceeding', 'exceeded', 'exceed', 'excessive'],
        answer: 0,
        explanation: '名詞 expense を後ろから修飾する現在分詞。「25ドルを超える経費」。'
      },
      {
        id: 11,
        blankNumber: 3,
        choices: [
          'The new policy also requires pre-approval for all flights over $500.',
          'The HR department was established in 2010.',
          'Travel is an important part of many industries.',
          'Some employees prefer to drive rather than fly.'
        ],
        answer: 0,
        explanation: '新しいポリシーの追加要件として、航空券の事前承認に関する文が文脈に合う。'
      },
      {
        id: 12,
        blankNumber: 4,
        choices: ['extension', 'extended', 'extending', 'extensively'],
        answer: 0,
        explanation: '「extension 3200」で「内線3200」。電話番号の前に使う名詞。'
      }
    ]
  },

  // ===== SET 4: Product Recall Notice =====
  {
    id: 4,
    passage: `IMPORTANT NOTICE — Product Recall\n\nGreenLeaf Home Products is voluntarily recalling its Model GL-500 portable heater due to a potential safety (1)______. A small number of units manufactured between June and August may have a defective power switch that could overheat.\n\nCustomers who (2)______ this product should immediately stop using it and contact our customer service department. We will arrange for a free replacement or a full refund.\n\n(3)______ We sincerely apologize for any inconvenience this may cause.\n\nFor more information, please call our toll-free number at 1-800-555-0199 or visit www.greenleafhome.com/recall. Our representatives are (4)______ Monday through Friday, 8 A.M. to 6 P.M.`,
    questions: [
      {
        id: 13,
        blankNumber: 1,
        choices: ['concern', 'effect', 'attention', 'condition'],
        answer: 0,
        explanation: '「safety concern」で「安全上の懸念」。製品リコールでよく使われる表現。'
      },
      {
        id: 14,
        blankNumber: 2,
        choices: ['purchased', 'will purchase', 'are purchasing', 'had been purchasing'],
        answer: 0,
        explanation: '過去に購入した顧客を指すので過去形が適切。'
      },
      {
        id: 15,
        blankNumber: 3,
        choices: [
          'No injuries have been reported to date.',
          'GreenLeaf was founded twenty years ago.',
          'Portable heaters are popular in winter.',
          'The company also sells kitchen appliances.'
        ],
        answer: 0,
        explanation: 'リコール通知で怪我の報告がないことを述べる文が文脈に適切。'
      },
      {
        id: 16,
        blankNumber: 4,
        choices: ['available', 'capable', 'eligible', 'accessible'],
        answer: 0,
        explanation: '「representatives are available」で「担当者が対応可能」。'
      }
    ]
  },

  // ===== SET 5: Business Letter — Client Follow-up =====
  {
    id: 5,
    passage: `Dear Mr. Tanaka,\n\nThank you for taking the time to meet with us last Thursday. It was a pleasure (1)______ your company's plans for expansion into the Asian market.\n\nAs we discussed, our firm can provide comprehensive consulting services to help you navigate the regulatory requirements in each target country. I have (2)______ a detailed proposal outlining our recommended approach and associated fees.\n\nPlease review the proposal at your convenience and let us know if you have any questions. (3)______\n\nWe look forward to the (4)______ of working with your team on this exciting project.\n\nSincerely,\nJames Morton\nSenior Consultant, Global Strategies Inc.`,
    questions: [
      {
        id: 17,
        blankNumber: 1,
        choices: ['discussing', 'to discuss', 'discussed', 'discuss'],
        answer: 0,
        explanation: '「It was a pleasure + 動名詞」の形。「～することは喜びでした」。'
      },
      {
        id: 18,
        blankNumber: 2,
        choices: ['attached', 'attended', 'attracted', 'attempted'],
        answer: 0,
        explanation: '「attached a detailed proposal」で「詳細な提案書を添付しました」。'
      },
      {
        id: 19,
        blankNumber: 3,
        choices: [
          'We would be happy to schedule a follow-up call to discuss the details.',
          'Our office is located on the fifth floor.',
          'The weather in Tokyo is quite mild in spring.',
          'James Morton has been with the company for ten years.'
        ],
        answer: 0,
        explanation: 'フォローアップの電話を提案する文が手紙の文脈に最も適切。'
      },
      {
        id: 20,
        blankNumber: 4,
        choices: ['opportunity', 'position', 'appointment', 'occupation'],
        answer: 0,
        explanation: '「look forward to the opportunity of ～」で「～の機会を楽しみにする」。'
      }
    ]
  },

  // ===== SET 6: Internal Announcement — IT System Upgrade =====
  {
    id: 6,
    passage: `ANNOUNCEMENT\n\nThe IT Department will be performing a major system upgrade this weekend. All company servers will be (1)______ from Friday at 10 P.M. until Sunday at 6 A.M.\n\nDuring this period, employees will not have access to email, the company intranet, or shared network drives. We strongly recommend that you save any important files to your local hard drive (2)______ the scheduled downtime.\n\n(3)______ We understand this may be inconvenient and appreciate your patience.\n\nIf you experience any issues after the upgrade is (4)______, please submit a help desk ticket through the IT portal or call extension 7100.`,
    questions: [
      {
        id: 21,
        blankNumber: 1,
        choices: ['unavailable', 'inaccessible', 'unresponsive', 'disconnected'],
        answer: 0,
        explanation: '「servers will be unavailable」で「サーバーが利用不可になる」。ITの文脈で一般的。'
      },
      {
        id: 22,
        blankNumber: 2,
        choices: ['before', 'while', 'after', 'since'],
        answer: 0,
        explanation: 'ダウンタイムの前にファイルを保存するよう勧めているので before が適切。'
      },
      {
        id: 23,
        blankNumber: 3,
        choices: [
          'The upgrade will improve system performance and security features.',
          'The IT Department was recently reorganized.',
          'Many employees work from home on Fridays.',
          'The company purchased new laptops last month.'
        ],
        answer: 0,
        explanation: 'アップグレードの目的・利点を説明する文が文脈に最も合う。'
      },
      {
        id: 24,
        blankNumber: 4,
        choices: ['complete', 'completed', 'completing', 'completion'],
        answer: 0,
        explanation: '「after the upgrade is complete」で「アップグレードが完了した後」。補語として形容詞。'
      }
    ]
  },

  // ===== SET 7: Event Invitation =====
  {
    id: 7,
    passage: `You are cordially invited to the Annual Business Excellence Awards Ceremony, hosted by the Chamber of Commerce.\n\nThe event will take place on Saturday, May 20, at the Grand Ballroom of the Riverside Hotel. A cocktail reception will begin at 6 P.M., (1)______ by dinner and the awards presentation at 7 P.M.\n\nThis year, we are (2)______ to announce that over 50 local businesses have been nominated across 10 categories. The keynote address will be delivered by renowned entrepreneur Ms. Diana Chen.\n\n(3)______ Attire for the evening is business formal.\n\nPlease RSVP by May 10 to ensure your seat. Tickets are $150 per person and can be (4)______ online at www.chambercommerce.org/awards.`,
    questions: [
      {
        id: 25,
        blankNumber: 1,
        choices: ['followed', 'following', 'follows', 'to follow'],
        answer: 0,
        explanation: '「followed by ～」で「～が続く」。過去分詞による受動表現。'
      },
      {
        id: 26,
        blankNumber: 2,
        choices: ['pleased', 'pleasant', 'pleasure', 'pleasing'],
        answer: 0,
        explanation: '「We are pleased to announce」で「発表できることを嬉しく思います」。'
      },
      {
        id: 27,
        blankNumber: 3,
        choices: [
          'Complimentary parking is available in the hotel garage.',
          'The Riverside Hotel opened three years ago.',
          'Diana Chen graduated from Harvard University.',
          'Last year\'s ceremony was held in June.'
        ],
        answer: 0,
        explanation: 'イベント参加者への実用情報（駐車場）を提供する文が文脈に適切。'
      },
      {
        id: 28,
        blankNumber: 4,
        choices: ['purchased', 'buying', 'sold', 'ordered'],
        answer: 0,
        explanation: '「Tickets can be purchased online」で「チケットはオンラインで購入可能」。'
      }
    ]
  },

  // ===== SET 8: Employee Newsletter — Wellness Program =====
  {
    id: 8,
    passage: `EMPLOYEE WELLNESS UPDATE\n\nWe are excited to announce the launch of our new corporate wellness program, "Healthy Horizons." Starting next month, all full-time employees will have (1)______ to a range of health and fitness resources at no additional cost.\n\nThe program includes discounted gym memberships, weekly yoga classes held in the office, and access to an online nutrition counseling platform. Employees who (2)______ in at least four wellness activities per quarter will receive a $50 bonus on their next paycheck.\n\n(3)______ Research shows that companies with active wellness programs see a 25% reduction in sick days.\n\nTo sign up, visit the HR portal and click on the "Wellness" tab. Registration (4)______ on April 1.`,
    questions: [
      {
        id: 29,
        blankNumber: 1,
        choices: ['access', 'entry', 'admission', 'approach'],
        answer: 0,
        explanation: '「have access to ～」で「～を利用できる」。'
      },
      {
        id: 30,
        blankNumber: 2,
        choices: ['participate', 'participating', 'participated', 'will have participated'],
        answer: 0,
        explanation: '関係代名詞 who の後に動詞の原形が必要。主語は Employees（複数形）。'
      },
      {
        id: 31,
        blankNumber: 3,
        choices: [
          'We believe this initiative will benefit both employees and the company.',
          'The HR department has ten staff members.',
          'Yoga originated in ancient India.',
          'Gym memberships can be expensive.'
        ],
        answer: 0,
        explanation: 'プログラムの価値を述べる文が、前後の文脈に最も合う。'
      },
      {
        id: 32,
        blankNumber: 4,
        choices: ['opens', 'will open', 'opened', 'has opened'],
        answer: 0,
        explanation: '未来の特定日を示すので現在形（確定した予定）が適切。'
      }
    ]
  },

  // ===== SET 9: Lease Agreement Notice =====
  {
    id: 9,
    passage: `Dear Tenant,\n\nThis letter is to notify you that your current lease agreement for Suite 405 at Parkview Business Center will (1)______ on June 30. If you wish to renew your lease, please contact our office no later than May 15.\n\nPlease note that the monthly rent for the upcoming term will be adjusted to reflect current market rates. The new rate will be $2,800 per month, which represents a 5% (2)______ from the current rate.\n\n(3)______ We value you as a tenant and hope to continue our business relationship.\n\nShould you decide not to renew, we kindly ask that you provide written notice and (4)______ the premises in good condition by the lease expiration date.\n\nSincerely,\nParkview Property Management`,
    questions: [
      {
        id: 33,
        blankNumber: 1,
        choices: ['expire', 'end', 'terminate', 'close'],
        answer: 0,
        explanation: '「lease will expire」で「リースが期限切れになる」。契約の文脈で一般的。'
      },
      {
        id: 34,
        blankNumber: 2,
        choices: ['increase', 'growth', 'expansion', 'addition'],
        answer: 0,
        explanation: '「a 5% increase」で「5%の値上げ」。家賃の変更を表す。'
      },
      {
        id: 35,
        blankNumber: 3,
        choices: [
          'Enclosed is a copy of the proposed lease renewal terms for your review.',
          'Parkview Business Center was built in 1998.',
          'Many businesses are relocating to the suburbs.',
          'The property management industry is growing rapidly.'
        ],
        answer: 0,
        explanation: 'リース更新条件の書類を同封している旨を伝える文が適切。'
      },
      {
        id: 36,
        blankNumber: 4,
        choices: ['vacate', 'empty', 'abandon', 'desert'],
        answer: 0,
        explanation: '「vacate the premises」で「施設を明け渡す」。法的文書でよく使われる。'
      }
    ]
  },

  // ===== SET 10: Training Workshop Announcement =====
  {
    id: 10,
    passage: `PROFESSIONAL DEVELOPMENT OPPORTUNITY\n\nThe Learning and Development team is pleased to offer a two-day workshop on Project Management Fundamentals. This workshop is designed for employees who want to (1)______ their project management skills and earn a certificate of completion.\n\nThe workshop will cover topics such as project planning, risk assessment, budget management, and stakeholder communication. It will be led by Dr. Angela Rivera, a (2)______ project management consultant with over 20 years of experience.\n\nDates: April 15-16\nTime: 9 A.M. to 4 P.M.\nLocation: Training Center, Building B\n\n(3)______ Space is limited to 30 participants, so early registration is (4)______.\n\nTo register, email training@company.com by April 5.`,
    questions: [
      {
        id: 37,
        blankNumber: 1,
        choices: ['enhance', 'enlarge', 'enable', 'enrich'],
        answer: 0,
        explanation: '「enhance skills」で「スキルを向上させる」。'
      },
      {
        id: 38,
        blankNumber: 2,
        choices: ['certified', 'certificate', 'certifying', 'certification'],
        answer: 0,
        explanation: '名詞 consultant を修飾する形容詞（過去分詞）。「認定された」。'
      },
      {
        id: 39,
        blankNumber: 3,
        choices: [
          'Lunch and refreshments will be provided on both days.',
          'Dr. Rivera lives in New York City.',
          'Building B has a large parking lot.',
          'The company employs over 500 people.'
        ],
        answer: 0,
        explanation: 'ワークショップ参加者への実用的な情報（昼食提供）が適切。'
      },
      {
        id: 40,
        blankNumber: 4,
        choices: ['encouraged', 'required', 'demanded', 'insisted'],
        answer: 0,
        explanation: '「early registration is encouraged」で「早めの登録をお勧めします」。'
      }
    ]
  },

  // ===== SET 11: Store Grand Opening =====
  {
    id: 11,
    passage: `GRAND OPENING — FreshMart Grocery\n\nFreshMart Grocery is thrilled to announce the grand opening of our newest location at 245 Oak Street. The store will officially open its doors on Saturday, March 5, at 8 A.M.\n\nTo celebrate, we are offering (1)______ discounts of up to 30% on selected items throughout the store during opening weekend. The first 100 customers will receive a free reusable shopping bag filled with sample products.\n\n(2)______ Our store features a wide selection of organic produce, a full-service deli, and a bakery with freshly baked goods made (3)______ on-site every morning.\n\nWe are committed to providing our customers with high-quality products at (4)______ prices. We look forward to serving the Oak Street community!\n\nStore Hours: Monday-Saturday 7 A.M. to 10 P.M., Sunday 8 A.M. to 8 P.M.`,
    questions: [
      {
        id: 41,
        blankNumber: 1,
        choices: ['exclusive', 'excluding', 'excluded', 'exclusion'],
        answer: 0,
        explanation: '名詞 discounts を修飾する形容詞。「exclusive discounts」で「特別割引」。'
      },
      {
        id: 42,
        blankNumber: 2,
        choices: [
          'There will also be live music, face painting, and fun activities for children.',
          'FreshMart was established in 2005.',
          'Grocery shopping can be time-consuming.',
          'Oak Street has heavy traffic during rush hour.'
        ],
        answer: 0,
        explanation: 'グランドオープニングイベントの追加アクティビティを紹介する文が適切。'
      },
      {
        id: 43,
        blankNumber: 3,
        choices: ['daily', 'day', 'everyday', 'days'],
        answer: 0,
        explanation: '副詞 daily が動詞 made を修飾。「毎日作られる」。'
      },
      {
        id: 44,
        blankNumber: 4,
        choices: ['affordable', 'afforded', 'affording', 'affordably'],
        answer: 0,
        explanation: '名詞 prices を修飾する形容詞。「affordable prices」で「手頃な価格」。'
      }
    ]
  },

  // ===== SET 12: Customer Service Email =====
  {
    id: 12,
    passage: `Dear Ms. Parker,\n\nThank you for contacting NovaTech Customer Support regarding your recent order (#NT-78234). We apologize for the (1)______ you experienced with your shipment.\n\nAfter reviewing your account, we confirmed that the incorrect item was sent due to a warehouse processing error. We have already shipped the correct item via express delivery, and it should (2)______ within two business days.\n\n(3)______ You do not need to return the incorrect item; please keep it with our compliments.\n\nWe take customer satisfaction very (4)______ and have implemented additional quality checks to prevent similar issues in the future. Thank you for your patience and understanding.\n\nKind regards,\nMichael Torres\nCustomer Support Manager`,
    questions: [
      {
        id: 45,
        blankNumber: 1,
        choices: ['inconvenience', 'convention', 'interference', 'indifference'],
        answer: 0,
        explanation: '「apologize for the inconvenience」で「ご不便をおかけして申し訳ございません」。'
      },
      {
        id: 46,
        blankNumber: 2,
        choices: ['arrive', 'be arriving', 'have arrived', 'be arrived'],
        answer: 0,
        explanation: '「should arrive」で「届くはずです」。should + 原形。'
      },
      {
        id: 47,
        blankNumber: 3,
        choices: [
          'A prepaid return label has been included in case you wish to send back the original packaging.',
          'NovaTech has been in business since 2012.',
          'Express delivery is our fastest shipping option.',
          'Ms. Parker is a loyal customer.'
        ],
        answer: 0,
        explanation: '返品手続きに関する追加情報を提供する文が文脈に合う。'
      },
      {
        id: 48,
        blankNumber: 4,
        choices: ['seriously', 'serious', 'seriousness', 'series'],
        answer: 0,
        explanation: '動詞 take を修飾する副詞。「take ～ seriously」で「～を真剣に受け止める」。'
      }
    ]
  },

  // ===== SET 13: Office Renovation Notice =====
  {
    id: 13,
    passage: `NOTICE TO ALL EMPLOYEES\n\nPlease be advised that renovation work on the second floor will (1)______ on Monday, July 10, and is expected to continue for approximately six weeks. The renovation will include new flooring, updated lighting, and the installation of additional meeting rooms.\n\nDuring the construction period, employees normally based on the second floor will be (2)______ relocated to temporary workstations on the fourth floor. Elevator access to the second floor will be restricted.\n\n(3)______ We apologize for any disruption and assure you that every effort will be made to minimize noise during business hours.\n\nA detailed schedule of the renovation phases is posted on the facilities page of the company intranet. Please direct any (4)______ to the Facilities Management team at facilities@company.com.`,
    questions: [
      {
        id: 49,
        blankNumber: 1,
        choices: ['commence', 'comment', 'commend', 'commit'],
        answer: 0,
        explanation: '「commence」は「開始する」。フォーマルな通知で使用される。'
      },
      {
        id: 50,
        blankNumber: 2,
        choices: ['temporarily', 'temporary', 'temporal', 'temp'],
        answer: 0,
        explanation: '過去分詞 relocated を修飾する副詞が必要。'
      },
      {
        id: 51,
        blankNumber: 3,
        choices: [
          'Employees are encouraged to use headphones if noise levels become distracting.',
          'The second floor was last renovated in 2015.',
          'The construction company is based in Chicago.',
          'Meeting rooms should be booked in advance.'
        ],
        answer: 0,
        explanation: '工事中の騒音対策として、ヘッドホン使用を勧める文が実用的で適切。'
      },
      {
        id: 52,
        blankNumber: 4,
        choices: ['concerns', 'arguments', 'worries', 'troubles'],
        answer: 0,
        explanation: '「direct concerns to ～」で「懸念事項は～に問い合わせてください」。ビジネス文書の表現。'
      }
    ]
  },

  // ===== SET 14: Supplier Notification =====
  {
    id: 14,
    passage: `Dear Valued Customer,\n\nWe are writing to inform you of an important change (1)______ our product line. Effective September 1, we will be discontinuing the Standard Series packaging materials and replacing them with our new EcoFriendly Series.\n\nThe EcoFriendly Series is made from 100% recycled materials and offers the same level of durability and (2)______ as the Standard Series. Pricing will remain unchanged during the transition period.\n\n(3)______ To ensure a smooth transition, we recommend placing your final Standard Series orders by August 15.\n\nWe are confident that you will be satisfied with the new product line. Please do not (4)______ to reach out if you have any questions or require product samples.\n\nBest regards,\nPacifica Packaging Solutions`,
    questions: [
      {
        id: 53,
        blankNumber: 1,
        choices: ['to', 'for', 'with', 'on'],
        answer: 0,
        explanation: '「change to ～」で「～への変更」。前置詞 to が適切。'
      },
      {
        id: 54,
        blankNumber: 2,
        choices: ['protection', 'protective', 'protectively', 'protector'],
        answer: 0,
        explanation: '前の durability と and で並列する名詞が必要。'
      },
      {
        id: 55,
        blankNumber: 3,
        choices: [
          'Sample kits of the EcoFriendly Series are available upon request.',
          'Pacifica Packaging was founded in Portland.',
          'Recycling rates have increased globally.',
          'Standard packaging has been popular for decades.'
        ],
        answer: 0,
        explanation: '新製品のサンプルキットを提供する旨の文が、移行期間の文脈に合う。'
      },
      {
        id: 56,
        blankNumber: 4,
        choices: ['hesitate', 'resist', 'delay', 'refuse'],
        answer: 0,
        explanation: '「do not hesitate to ～」で「遠慮なく～してください」。定型表現。'
      }
    ]
  },

  // ===== SET 15: Conference Registration =====
  {
    id: 15,
    passage: `GLOBAL TECH SUMMIT 2026\nRegistration Now Open!\n\nJoin industry leaders and innovators at the Global Tech Summit, taking place November 8-10 at the Metropolitan Convention Center. This year's theme is "Innovation in the Age of AI."\n\nThe three-day event will feature over 100 presentations, panel discussions, and hands-on workshops. (1)______ speakers include CEOs from leading technology companies and award-winning researchers.\n\nEarly bird registration is available until August 31 at the (2)______ rate of $450. After that date, the standard rate of $650 will apply.\n\n(3)______ Group discounts are available for organizations registering five or more attendees.\n\nVisit www.globaltechsummit.com to view the full agenda and (4)______ your spot today.`,
    questions: [
      {
        id: 57,
        blankNumber: 1,
        choices: ['Keynote', 'Primary', 'Chief', 'Main'],
        answer: 0,
        explanation: '「Keynote speakers」で「基調講演者」。カンファレンスの文脈で標準的。'
      },
      {
        id: 58,
        blankNumber: 2,
        choices: ['discounted', 'discount', 'discounting', 'discounts'],
        answer: 0,
        explanation: '名詞 rate を修飾する形容詞（過去分詞）。「discounted rate」で「割引料金」。'
      },
      {
        id: 59,
        blankNumber: 3,
        choices: [
          'Accommodation packages at partner hotels are also available at special rates.',
          'The convention center has a seating capacity of 5,000.',
          'Artificial intelligence is transforming many industries.',
          'Last year\'s summit attracted 3,000 attendees.'
        ],
        answer: 0,
        explanation: '参加者向けの宿泊パッケージ情報が、登録に関する文脈に合う。'
      },
      {
        id: 60,
        blankNumber: 4,
        choices: ['reserve', 'preserve', 'conserve', 'deserve'],
        answer: 0,
        explanation: '「reserve your spot」で「席を予約する」。イベント登録の表現。'
      }
    ]
  },

  // ===== SET 16: Performance Review Memo =====
  {
    id: 16,
    passage: `MEMORANDUM\n\nTo: All Managers\nFrom: Linda Park, Director of Human Resources\nDate: February 15\nRe: Annual Performance Review Schedule\n\nThe annual performance review cycle will begin on March 1 and must be (1)______ by March 31. All managers are required to conduct in-person reviews with each of their direct reports.\n\nThis year, we have updated the evaluation form to include a new section on professional development goals. Please (2)______ yourself with the revised form, which is available on the HR portal.\n\n(3)______ Completed review forms should be submitted electronically through the HR system.\n\nManagers who need (4)______ training on the new evaluation criteria may attend an optional workshop on February 25. Please RSVP to hr@company.com.\n\nThank you for your cooperation.`,
    questions: [
      {
        id: 61,
        blankNumber: 1,
        choices: ['completed', 'completing', 'complete', 'completion'],
        answer: 0,
        explanation: '「must be completed」で「完了されなければならない」。受動態。'
      },
      {
        id: 62,
        blankNumber: 2,
        choices: ['familiarize', 'familiar', 'familiarity', 'familiarized'],
        answer: 0,
        explanation: '「familiarize yourself with ～」で「～に精通してください」。'
      },
      {
        id: 63,
        blankNumber: 3,
        choices: [
          'A calibration session will be held on March 15 to ensure consistency across departments.',
          'Linda Park joined the company in 2019.',
          'Performance reviews can be stressful for employees.',
          'The HR portal was redesigned last month.'
        ],
        answer: 0,
        explanation: '部門間の評価の一貫性を確保するためのセッションが文脈に合う。'
      },
      {
        id: 64,
        blankNumber: 4,
        choices: ['additional', 'addition', 'additionally', 'added'],
        answer: 0,
        explanation: '名詞 training を修飾する形容詞。「additional training」で「追加研修」。'
      }
    ]
  },

  // ===== SET 17: Restaurant Opening Advertisement =====
  {
    id: 17,
    passage: `BELLA CUCINA ITALIAN RESTAURANT\nNow Open in Maplewood!\n\nExperience authentic Italian cuisine in the heart of Maplewood. Chef Marco Rossi, (1)______ trained in Rome and Florence, brings traditional recipes with a modern twist to every dish.\n\nOur menu features handmade pasta, wood-fired pizza, and an extensive selection of Italian wines. All of our ingredients are (2)______ sourced from local farms and imported directly from Italy.\n\n(3)______ Reservations are recommended for weekend dining but are not required for weekday visits.\n\nTo celebrate our opening, enjoy a complimentary dessert with any entrée purchase throughout the month of April. Visit us at 127 Main Street or make a reservation (4)______ calling (555) 890-1234.\n\nWe look forward to welcoming you!`,
    questions: [
      {
        id: 65,
        blankNumber: 1,
        choices: ['who', 'whom', 'whose', 'which'],
        answer: 0,
        explanation: '主格の関係代名詞。Chef Marco Rossi を先行詞として「trained」の主語。'
      },
      {
        id: 66,
        blankNumber: 2,
        choices: ['freshly', 'fresh', 'freshen', 'freshness'],
        answer: 0,
        explanation: '過去分詞 sourced を修飾する副詞。「freshly sourced」で「新鮮に調達された」。'
      },
      {
        id: 67,
        blankNumber: 3,
        choices: [
          'Private dining rooms are available for parties of eight or more.',
          'Italian cuisine is popular worldwide.',
          'Chef Rossi has won several cooking competitions.',
          'Maplewood is a charming neighborhood.'
        ],
        answer: 0,
        explanation: 'レストランのサービス（個室利用可能）を紹介する文が文脈に適切。'
      },
      {
        id: 68,
        blankNumber: 4,
        choices: ['by', 'with', 'from', 'through'],
        answer: 0,
        explanation: '「by calling」で「電話することで」。手段を表す前置詞 by + 動名詞。'
      }
    ]
  },

  // ===== SET 18: Safety Procedures Update =====
  {
    id: 18,
    passage: `SAFETY BULLETIN\n\nTo: All Warehouse Staff\nFrom: Robert Chen, Safety Director\nDate: October 5\n\nFollowing the recent safety audit, several updates have been made to our warehouse (1)______ procedures. All staff members are required to review and acknowledge these changes by October 20.\n\nThe most significant change involves the use of personal protective equipment (PPE). Effective immediately, safety goggles must be worn at all times in Zones C and D, (2)______ to the existing requirement for hard hats and steel-toed boots.\n\n(3)______ Failure to comply with safety regulations may result in disciplinary action.\n\nAll warehouse employees must attend a mandatory safety briefing on October 12 at 2 P.M. in the main warehouse. The briefing will last (4)______ one hour.`,
    questions: [
      {
        id: 69,
        blankNumber: 1,
        choices: ['operating', 'operation', 'operate', 'operated'],
        answer: 0,
        explanation: '名詞 procedures を修飾する形容詞的な現在分詞。「operating procedures」で「作業手順」。'
      },
      {
        id: 70,
        blankNumber: 2,
        choices: ['in addition', 'moreover', 'however', 'instead'],
        answer: 0,
        explanation: '「in addition to ～」で「～に加えて」。既存の要件に追加する文脈。'
      },
      {
        id: 71,
        blankNumber: 3,
        choices: [
          'Updated safety posters have been placed in all common areas for reference.',
          'Robert Chen has been the Safety Director for five years.',
          'Warehouse work can be physically demanding.',
          'The audit was conducted by an external firm.'
        ],
        answer: 0,
        explanation: '安全に関する追加情報（ポスター掲示）が文脈に合う。'
      },
      {
        id: 72,
        blankNumber: 4,
        choices: ['approximately', 'approximate', 'approximation', 'approximated'],
        answer: 0,
        explanation: '「last approximately one hour」の副詞。「approximately」で「約」。'
      }
    ]
  },

  // ===== SET 19: Retirement Announcement =====
  {
    id: 19,
    passage: `Dear Colleagues,\n\nIt is with mixed emotions that I announce the upcoming retirement of David Park, our Senior Vice President of Sales. After 35 years of (1)______ service, David will be retiring effective December 31.\n\nThroughout his career, David has been instrumental in building our sales team from a small group of five to a department of over 200 professionals. His leadership and (2)______ to excellence have greatly contributed to the company's growth.\n\n(3)______ We wish David all the best in his well-deserved retirement.\n\nA farewell reception will be held in his honor on December 20 from 4 P.M. to 6 P.M. in the main lobby. All employees are welcome to attend and (4)______ David for his remarkable contributions.\n\nWarm regards,\nCEO Margaret Wilson`,
    questions: [
      {
        id: 73,
        blankNumber: 1,
        choices: ['dedicated', 'dedicating', 'dedication', 'dedicate'],
        answer: 0,
        explanation: '名詞 service を修飾する形容詞（過去分詞）。「dedicated service」で「献身的な勤務」。'
      },
      {
        id: 74,
        blankNumber: 2,
        choices: ['commitment', 'committee', 'commission', 'commodity'],
        answer: 0,
        explanation: '「commitment to excellence」で「卓越性への取り組み」。'
      },
      {
        id: 75,
        blankNumber: 3,
        choices: [
          'A search for his replacement is currently under way, and an announcement will be made in January.',
          'David Park lives in the suburbs with his family.',
          'Retirement planning is important for all employees.',
          'The sales department exceeded its targets last year.'
        ],
        answer: 0,
        explanation: '後任の人事に関する情報が退職のお知らせの文脈に最も適切。'
      },
      {
        id: 76,
        blankNumber: 4,
        choices: ['thank', 'appreciate', 'congratulate', 'praise'],
        answer: 0,
        explanation: '「thank David for his contributions」で「貢献に感謝する」。'
      }
    ]
  },

  // ===== SET 20: Software Update Notification =====
  {
    id: 20,
    passage: `IMPORTANT: Software Update Required\n\nAll employees are required to update their computers to Version 12.5 of the company's project management software by (1)______ of business on Friday, November 10.\n\nThe update includes several critical security patches and new features that will improve workflow (2)______. Among the new features are enhanced reporting tools, real-time collaboration capabilities, and an improved user interface.\n\n(3)______ The update process takes approximately 15 minutes and requires a system restart.\n\nTo install the update, open the application, go to Settings, and click "Check for Updates." If you encounter any (4)______ during the installation, please contact the IT Help Desk at extension 5500 or submit a support ticket online.\n\nThank you for your prompt attention to this matter.`,
    questions: [
      {
        id: 77,
        blankNumber: 1,
        choices: ['close', 'end', 'finish', 'completion'],
        answer: 0,
        explanation: '「by close of business」で「営業終了時までに」。ビジネスの定型表現。'
      },
      {
        id: 78,
        blankNumber: 2,
        choices: ['efficiency', 'efficient', 'efficiently', 'efficiencies'],
        answer: 0,
        explanation: '動詞 improve の目的語として名詞が必要。「improve efficiency」で「効率を向上させる」。'
      },
      {
        id: 79,
        blankNumber: 3,
        choices: [
          'Please save all open files before beginning the update to avoid data loss.',
          'The software was originally developed by an external vendor.',
          'Many employees prefer working on laptops.',
          'Version 12.4 was released three months ago.'
        ],
        answer: 0,
        explanation: 'アップデート前にファイルを保存する注意事項が文脈に合う。'
      },
      {
        id: 80,
        blankNumber: 4,
        choices: ['difficulties', 'hardships', 'obstacles', 'barriers'],
        answer: 0,
        explanation: '「encounter difficulties」で「困難に遭遇する」。技術サポートの文脈で適切。'
      }
    ]
  },

  // ===== SET 21: Charity Event Announcement =====
  {
    id: 21,
    passage: `COMMUNITY INVOLVEMENT\n\nWe are proud to announce that our company will be hosting its 10th Annual Charity Fun Run on Saturday, June 15. All (1)______ from the event will be donated to the Children's Education Foundation.\n\nEmployees, their families, and members of the community are invited to participate. The run offers three distance options: a 5K run, a 10K run, and a 1-mile family walk. Registration is $25 per (2)______.\n\n(3)______ Last year's event raised over $50,000, and we hope to exceed that amount this year.\n\nVolunteers are needed to help with event setup, registration, and water stations along the route. If you are (4)______ in volunteering, please contact the Community Relations team by May 30.\n\nLet's make this our best year yet!`,
    questions: [
      {
        id: 81,
        blankNumber: 1,
        choices: ['proceeds', 'processes', 'procedures', 'progress'],
        answer: 0,
        explanation: '「proceeds from the event」で「イベントの収益金」。チャリティイベントの表現。'
      },
      {
        id: 82,
        blankNumber: 2,
        choices: ['participant', 'participation', 'participate', 'participating'],
        answer: 0,
        explanation: '「$25 per participant」で「参加者1人あたり25ドル」。名詞が必要。'
      },
      {
        id: 83,
        blankNumber: 3,
        choices: [
          'T-shirts and water bottles will be provided to all registered participants.',
          'Running is an excellent form of exercise.',
          'The Children\'s Education Foundation was founded in 2000.',
          'Our company has offices in five countries.'
        ],
        answer: 0,
        explanation: '参加者への配布物に関する情報がイベントの文脈に合う。'
      },
      {
        id: 84,
        blankNumber: 4,
        choices: ['interested', 'interesting', 'interest', 'interests'],
        answer: 0,
        explanation: '「be interested in ～」で「～に興味がある」。人を主語にした表現。'
      }
    ]
  },

  // ===== SET 22: Shipping Policy Update =====
  {
    id: 22,
    passage: `Dear Customer,\n\nWe are pleased to announce updates to our shipping policy, effective January 1. These changes are designed to provide you with faster and more (1)______ delivery options.\n\nStarting next year, standard shipping will be free for all orders over $50, reduced from the previous threshold of $75. Additionally, express shipping times have been shortened from three business days to two business days for most (2)______.\n\n(3)______ International shipping rates have also been reduced by 15% across all destinations.\n\nWe have partnered with two new carriers to expand our delivery network and ensure that your orders arrive on time. For complete details on our updated shipping policy, please visit the (4)______ section of our website.\n\nThank you for being a valued customer.\n\nBest regards,\nShopDirect Customer Care Team`,
    questions: [
      {
        id: 85,
        blankNumber: 1,
        choices: ['reliable', 'reliance', 'reliably', 'reliability'],
        answer: 0,
        explanation: '前の faster と and で並列する形容詞。「more reliable」で「より信頼性の高い」。'
      },
      {
        id: 86,
        blankNumber: 2,
        choices: ['destinations', 'directions', 'locations', 'positions'],
        answer: 0,
        explanation: '配送先を表す「destinations」。shipping の文脈で適切。'
      },
      {
        id: 87,
        blankNumber: 3,
        choices: [
          'Same-day delivery is now available in select metropolitan areas.',
          'We started our business ten years ago.',
          'Shipping costs are a concern for many online shoppers.',
          'Our warehouse is located in Ohio.'
        ],
        answer: 0,
        explanation: '配送ポリシーの追加改善点（即日配達）が文脈に合う。'
      },
      {
        id: 88,
        blankNumber: 4,
        choices: ['FAQ', 'news', 'contact', 'about'],
        answer: 0,
        explanation: '配送ポリシーの詳細は FAQ（よくある質問）セクションに掲載されるのが一般的。'
      }
    ]
  },

  // ===== SET 23: New Branch Office Memo =====
  {
    id: 23,
    passage: `MEMORANDUM\n\nTo: All Staff\nFrom: Executive Leadership Team\nDate: August 1\nRe: Opening of New Branch Office\n\nWe are excited to announce that the company will be opening a new branch office in Austin, Texas, on October 1. This expansion is a direct (1)______ of our continued growth and increasing demand for our services in the southwestern region.\n\nThe Austin office will initially employ 50 staff members across sales, marketing, and client services. Current employees who are interested in (2)______ to the new office are encouraged to apply through the internal job board.\n\n(3)______ The office will be located in the Lakewood Business Park, which offers modern facilities and excellent transportation links.\n\nRelocation (4)______ will be provided to employees who are selected for transfer. For more information, please attend the informational session on August 15 at 3 P.M. in the auditorium.`,
    questions: [
      {
        id: 89,
        blankNumber: 1,
        choices: ['result', 'reason', 'cause', 'factor'],
        answer: 0,
        explanation: '「a direct result of ～」で「～の直接的な結果」。'
      },
      {
        id: 90,
        blankNumber: 2,
        choices: ['transferring', 'transferred', 'transfer', 'to transfer'],
        answer: 0,
        explanation: '「interested in + 動名詞」の形。前置詞 in の後は動名詞。'
      },
      {
        id: 91,
        blankNumber: 3,
        choices: [
          'A temporary project team has been assembled to oversee the office setup.',
          'Austin is the capital of Texas.',
          'The company was founded in New York.',
          'Branch offices require significant investment.'
        ],
        answer: 0,
        explanation: 'オフィス設立のためのプロジェクトチーム結成の情報が文脈に適切。'
      },
      {
        id: 92,
        blankNumber: 4,
        choices: ['assistance', 'assistant', 'assist', 'assisting'],
        answer: 0,
        explanation: '「Relocation assistance」で「転勤支援」。名詞が必要。'
      }
    ]
  },

  // ===== SET 24: Client Proposal Letter =====
  {
    id: 24,
    passage: `Dear Ms. Nakamura,\n\nFollowing our telephone conversation on Tuesday, I am pleased to submit this proposal for the redesign of your company's corporate website. At WebCraft Solutions, we (1)______ in creating visually appealing and user-friendly websites that drive business results.\n\nOur proposed approach includes a complete redesign of the site architecture, development of responsive layouts for mobile devices, and integration of an e-commerce (2)______. The project timeline is estimated at 12 weeks from the date of approval.\n\n(3)______ The total cost for the project is $45,000, which includes design, development, testing, and one year of technical support.\n\nWe are confident that the redesigned website will significantly (4)______ your online presence and customer engagement. I would welcome the opportunity to discuss this proposal in detail at your earliest convenience.\n\nSincerely,\nRachel Kim\nProject Director, WebCraft Solutions`,
    questions: [
      {
        id: 93,
        blankNumber: 1,
        choices: ['specialize', 'specify', 'speculate', 'sponsor'],
        answer: 0,
        explanation: '「specialize in ～」で「～を専門とする」。'
      },
      {
        id: 94,
        blankNumber: 2,
        choices: ['platform', 'stage', 'foundation', 'base'],
        answer: 0,
        explanation: '「e-commerce platform」で「ECプラットフォーム」。IT用語として標準的。'
      },
      {
        id: 95,
        blankNumber: 3,
        choices: [
          'A detailed breakdown of costs by project phase is included in the appendix.',
          'WebCraft Solutions has 50 employees.',
          'Website redesigns can take several months.',
          'Ms. Nakamura\'s company is based in Osaka.'
        ],
        answer: 0,
        explanation: '費用の詳細な内訳が付録に含まれているという情報が提案書の文脈に合う。'
      },
      {
        id: 96,
        blankNumber: 4,
        choices: ['enhance', 'enlarge', 'enable', 'enforce'],
        answer: 0,
        explanation: '「enhance your online presence」で「オンラインプレゼンスを向上させる」。'
      }
    ]
  },

  // ===== SET 25: Year-End Report =====
  {
    id: 25,
    passage: `YEAR-END REPORT SUMMARY\n\nDear Shareholders,\n\nI am pleased to present the highlights of our fiscal year 2025 performance. Despite challenging market conditions, the company achieved record revenue of $2.3 billion, (1)______ a 12% increase over the previous year.\n\nOur success can be attributed to strong performance across all business divisions, (2)______ in the technology services segment, which grew by 25%. We also expanded into three new international markets, bringing our global presence to 28 countries.\n\n(3)______ Looking ahead, we plan to invest $150 million in research and development to drive future innovation.\n\nOn behalf of the board of directors, I would like to express our (4)______ to all employees, partners, and shareholders who contributed to this outstanding year. We look forward to building on this momentum in 2026.\n\nSincerely,\nRichard Hayes\nChairman and CEO`,
    questions: [
      {
        id: 97,
        blankNumber: 1,
        choices: ['representing', 'represent', 'represented', 'representative'],
        answer: 0,
        explanation: '分詞構文として前の文を補足説明。「～を表す（12%の増加を示す）」。'
      },
      {
        id: 98,
        blankNumber: 2,
        choices: ['particularly', 'particular', 'part', 'partial'],
        answer: 0,
        explanation: '副詞「particularly」で「特に」。特定部門を強調する。'
      },
      {
        id: 99,
        blankNumber: 3,
        choices: [
          'We also reduced operating costs by 8% through improved efficiency measures.',
          'Richard Hayes became CEO in 2018.',
          'The stock market was volatile throughout the year.',
          'Many companies reported losses this year.'
        ],
        answer: 0,
        explanation: '業績の追加ハイライト（コスト削減）が年次報告書の文脈に合う。'
      },
      {
        id: 100,
        blankNumber: 4,
        choices: ['gratitude', 'attitude', 'magnitude', 'aptitude'],
        answer: 0,
        explanation: '「express our gratitude」で「感謝の意を表する」。フォーマルな表現。'
      }
    ]
  }
];
