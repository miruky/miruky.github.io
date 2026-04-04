import { ReadingPassage } from './types';

export const readingPassages800: ReadingPassage[] = [
  {
    id: 18,
    title: 'Quarterly Revenue Analysis',
    passage: `Meridian Technologies released its third-quarter earnings report on Friday, revealing a 14% year-over-year increase in consolidated revenue, which reached $3.2 billion. The growth was primarily driven by the company's cloud computing division, which saw a remarkable 38% surge in subscription-based services. However, the hardware segment experienced a modest decline of 4%, attributed to ongoing supply chain disruptions and intensified competition from emerging markets. Chief Financial Officer Laura Chen noted that operating margins improved by 2.3 percentage points, reflecting the company's strategic pivot toward higher-margin software solutions. "Our disciplined approach to cost management, combined with accelerating demand for enterprise cloud services, has positioned us favorably for sustained profitability," Chen stated during the earnings call. Looking ahead, Meridian revised its full-year guidance upward, projecting annual revenue between $12.5 billion and $12.8 billion, contingent upon the successful integration of its recently acquired cybersecurity subsidiary, ShieldNet. Analysts have responded positively, with several upgrading their price targets for Meridian's stock.`,
    level: 800,
    category: 'business report',
    questions: [
      {
        id: 1,
        question: 'What was the primary driver of Meridian Technologies\' revenue growth?',
        choices: [
          'Expansion of its hardware product line',
          'Growth in cloud computing subscription services',
          'Acquisition of ShieldNet',
          'Cost-cutting measures across all divisions'
        ],
        answer: 1,
        explanation: '本文では「the company\'s cloud computing division, which saw a remarkable 38% surge in subscription-based services」と述べられており、クラウドコンピューティング部門のサブスクリプションサービスが成長の主因です。'
      },
      {
        id: 2,
        question: 'What happened to the hardware segment?',
        choices: [
          'It grew by 14%',
          'It remained stable',
          'It experienced a slight decline',
          'It was discontinued'
        ],
        answer: 2,
        explanation: '「the hardware segment experienced a modest decline of 4%」と記載されており、ハードウェア部門はわずかに減少しました。'
      },
      {
        id: 3,
        question: 'The word "contingent" in the passage is closest in meaning to:',
        choices: [
          'Independent',
          'Dependent',
          'Unrelated',
          'Guaranteed'
        ],
        answer: 1,
        explanation: '「contingent upon」は「～に依存して、～を条件として」という意味で、「dependent」が最も近いです。'
      },
      {
        id: 4,
        question: 'What can be inferred about analysts\' reaction to the report?',
        choices: [
          'They were disappointed by the hardware decline',
          'They were cautious about future projections',
          'They viewed the results favorably',
          'They recommended selling the stock'
        ],
        answer: 2,
        explanation: '「Analysts have responded positively, with several upgrading their price targets」とあり、アナリストは好意的に反応したことが推測できます。'
      },
      {
        id: 5,
        question: 'What is NOT mentioned as a reason for the hardware segment\'s decline?',
        choices: [
          'Supply chain disruptions',
          'Competition from emerging markets',
          'Decreased consumer spending',
          'Both A and B are mentioned'
        ],
        answer: 2,
        explanation: 'サプライチェーンの混乱と新興市場からの競争は言及されていますが、消費者支出の減少は述べられていません。'
      }
    ]
  },
  {
    id: 19,
    title: 'New Corporate Sustainability Initiative',
    passage: `Hartwell Industries announced today the launch of its comprehensive Environmental Stewardship Program, a multi-phase initiative aimed at achieving carbon neutrality across all global operations by 2030. The program encompasses three primary pillars: transitioning manufacturing facilities to 100% renewable energy sources, implementing a closed-loop recycling system for industrial waste, and establishing partnerships with local communities for reforestation projects. CEO Marcus Hartwell emphasized that the initiative represents more than a corporate social responsibility measure. "This is fundamentally a business strategy," he explained. "Companies that fail to address environmental sustainability will face escalating regulatory costs, diminished brand value, and difficulty attracting top-tier talent." The first phase, scheduled for completion by the end of next year, involves retrofitting twelve production plants with solar panel arrays and advanced energy storage systems. The estimated investment for this phase alone exceeds $450 million. Hartwell acknowledged that short-term profitability may be impacted but expressed confidence that the long-term returns would be substantial. Industry observers have noted that Hartwell's timeline is among the most ambitious in the manufacturing sector.`,
    level: 800,
    category: 'press release',
    questions: [
      {
        id: 1,
        question: 'What is the ultimate goal of the Environmental Stewardship Program?',
        choices: [
          'To increase short-term profitability',
          'To achieve carbon neutrality by 2030',
          'To comply with new government regulations',
          'To attract more investors'
        ],
        answer: 1,
        explanation: '「achieving carbon neutrality across all global operations by 2030」と記載されており、2030年までにカーボンニュートラルを達成することが最終目標です。'
      },
      {
        id: 2,
        question: 'According to CEO Marcus Hartwell, why is this initiative important?',
        choices: [
          'It is required by new environmental laws',
          'It will immediately boost profits',
          'It is a fundamental business strategy for long-term success',
          'It was demanded by shareholders'
        ],
        answer: 2,
        explanation: 'CEOは「This is fundamentally a business strategy」と述べ、規制コスト、ブランド価値、人材確保の観点から長期的なビジネス戦略であると説明しています。'
      },
      {
        id: 3,
        question: 'The word "retrofitting" is closest in meaning to:',
        choices: [
          'Demolishing',
          'Relocating',
          'Modifying or upgrading',
          'Inspecting'
        ],
        answer: 2,
        explanation: '「retrofitting」は既存の施設を改修・改装することを意味し、「modifying or upgrading」が最も近いです。'
      },
      {
        id: 4,
        question: 'What is NOT one of the three pillars of the program?',
        choices: [
          'Renewable energy transition',
          'Closed-loop recycling',
          'Electric vehicle fleet deployment',
          'Community reforestation partnerships'
        ],
        answer: 2,
        explanation: '3つの柱は再生可能エネルギーへの移行、閉ループリサイクル、地域の植林プロジェクトです。電気自動車の展開は言及されていません。'
      },
      {
        id: 5,
        question: 'What can be inferred about the program\'s first phase?',
        choices: [
          'It will be completed by 2030',
          'It requires a significant financial commitment',
          'It focuses on recycling systems',
          'It has already been completed'
        ],
        answer: 1,
        explanation: '第一フェーズの投資額は4億5000万ドルを超えると記載されており、かなりの財政的コミットメントが必要であると推測できます。'
      }
    ]
  },
  {
    id: 20,
    title: 'Remote Work Policy Revision',
    passage: `Effective January 1, Pinnacle Consulting Group will implement a revised hybrid work policy that replaces the current fully flexible remote arrangement introduced during the pandemic. Under the new framework, all employees classified as Level 3 and above will be required to maintain a minimum of three in-office days per week, while those at Levels 1 and 2 must be present at least two days. The policy stipulates that Tuesday and Thursday are designated as mandatory in-office days for all staff to facilitate cross-departmental collaboration. Employees who reside more than 75 miles from their assigned office may apply for a permanent remote exemption, subject to managerial approval and quarterly performance reviews. The Human Resources department has established a 90-day transition period during which compliance will be monitored but not enforced through disciplinary action. Director of Operations Priya Sharma stated that the decision was informed by internal surveys indicating a 23% decline in spontaneous innovation and a measurable reduction in mentorship engagement since the adoption of fully remote work. "We recognize that flexibility remains important," Sharma said, "but we must balance individual preferences with organizational effectiveness."`,
    level: 800,
    category: 'policy document',
    questions: [
      {
        id: 1,
        question: 'What is the main purpose of the new policy?',
        choices: [
          'To eliminate remote work entirely',
          'To establish a structured hybrid work arrangement',
          'To reduce office space costs',
          'To hire more remote employees'
        ],
        answer: 1,
        explanation: '新しいポリシーはハイブリッド勤務の枠組みを導入するもので、完全なリモートワークの廃止ではなく、構造化されたハイブリッド体制の確立が目的です。'
      },
      {
        id: 2,
        question: 'How many in-office days are required for Level 1 employees?',
        choices: [
          'One day per week',
          'Two days per week',
          'Three days per week',
          'Five days per week'
        ],
        answer: 1,
        explanation: '「those at Levels 1 and 2 must be present at least two days」と記載されており、レベル1とレベル2の従業員は週2日以上のオフィス出社が求められます。'
      },
      {
        id: 3,
        question: 'Who may apply for a permanent remote exemption?',
        choices: [
          'Any employee who prefers working from home',
          'Employees living more than 75 miles from their office',
          'Only Level 3 and above employees',
          'Employees with more than 5 years of tenure'
        ],
        answer: 1,
        explanation: '「Employees who reside more than 75 miles from their assigned office may apply for a permanent remote exemption」と記載されています。'
      },
      {
        id: 4,
        question: 'What can be inferred about the 90-day transition period?',
        choices: [
          'Employees can ignore the policy during this time',
          'The company acknowledges that adjustment takes time',
          'Disciplinary action will be taken immediately',
          'The policy may be cancelled after 90 days'
        ],
        answer: 1,
        explanation: '90日間の移行期間中はコンプライアンスを監視するが懲戒処分は行わないとあり、会社が適応に時間がかかることを認識していると推測できます。'
      },
      {
        id: 5,
        question: 'The word "stipulates" in the passage is closest in meaning to:',
        choices: [
          'Suggests',
          'Specifies as a requirement',
          'Recommends',
          'Considers'
        ],
        answer: 1,
        explanation: '「stipulates」は「規定する、条件として定める」という意味で、「specifies as a requirement（要件として明示する）」が最も近いです。'
      }
    ]
  },
  {
    id: 21,
    title: 'Restaurant Review: The Gilded Fork',
    passage: `Nestled in the heart of the revitalized Waterfront District, The Gilded Fork has quickly established itself as one of the city's most compelling dining destinations since its opening three months ago. Executive Chef Tomoko Hayashi, formerly of the Michelin-starred Lumière in Paris, brings an innovative fusion of French technique and Japanese sensibility to a menu that defies easy categorization. The tasting menu, priced at $185 per person, offers a journey through eight meticulously crafted courses. Standout dishes include a delicate miso-glazed foie gras served on a bed of shiso foam, and a breathtaking wagyu tartare with truffle ponzu. The wine selection, curated by sommelier Étienne Dufour, is extensive and thoughtfully paired with each course, though the markup is unmistakably steep. The interior, designed by award-winning architect Lena Voss, features floor-to-ceiling windows overlooking the harbor, creating an atmosphere of understated elegance. Service is impeccable, with staff demonstrating genuine knowledge and enthusiasm without being intrusive. My only reservation concerns the dessert course, which, while technically proficient, lacked the creative audacity displayed in the savory dishes. Despite this minor shortcoming, The Gilded Fork is a remarkable addition to the city's culinary landscape.`,
    level: 800,
    category: 'review',
    questions: [
      {
        id: 1,
        question: 'What is the reviewer\'s overall assessment of The Gilded Fork?',
        choices: [
          'It is overpriced and disappointing',
          'It is highly impressive with minor shortcomings',
          'It is average compared to other restaurants',
          'It needs significant improvement'
        ],
        answer: 1,
        explanation: 'レビュアーは全体的に高く評価しつつ、デザートコースにのみ軽い不満を述べています。「remarkable addition」という表現からも好意的な評価であることがわかります。'
      },
      {
        id: 2,
        question: 'What is Chef Hayashi\'s culinary approach described as?',
        choices: [
          'Traditional French cuisine',
          'Classic Japanese cooking',
          'A fusion of French technique and Japanese sensibility',
          'Modern American gastronomy'
        ],
        answer: 2,
        explanation: '「an innovative fusion of French technique and Japanese sensibility」と明記されており、フランスの技法と日本の感性の融合です。'
      },
      {
        id: 3,
        question: 'The word "audacity" in the passage is closest in meaning to:',
        choices: [
          'Caution',
          'Boldness',
          'Accuracy',
          'Simplicity'
        ],
        answer: 1,
        explanation: '「audacity」は「大胆さ、果敢さ」という意味で、「boldness」が最も近いです。デザートに料理の大胆な創造性が欠けていたという文脈です。'
      },
      {
        id: 4,
        question: 'What criticism does the reviewer make about the wine selection?',
        choices: [
          'It is too limited',
          'It does not pair well with the food',
          'The prices are noticeably high',
          'The sommelier is not knowledgeable'
        ],
        answer: 2,
        explanation: '「the markup is unmistakably steep」と述べられており、ワインの価格が明らかに高いことが批判点です。'
      },
      {
        id: 5,
        question: 'What is NOT mentioned about the restaurant?',
        choices: [
          'The location of the restaurant',
          'The architect who designed the interior',
          'The restaurant\'s reservation policy',
          'The name of the sommelier'
        ],
        answer: 2,
        explanation: 'レストランの所在地、インテリアデザイナー、ソムリエの名前は言及されていますが、予約ポリシーについては触れられていません。'
      }
    ]
  },
  {
    id: 22,
    title: 'Global Semiconductor Shortage Update',
    passage: `The prolonged global semiconductor shortage that has disrupted industries worldwide for nearly two years shows signs of gradual alleviation, according to a comprehensive report released by the International Semiconductor Trade Association (ISTA). However, the report cautions that full recovery to pre-shortage supply levels is unlikely before the second half of next year. The automotive sector, which has been disproportionately affected due to its reliance on legacy chip architectures, continues to face significant bottlenecks. Major automakers, including Stellantis and Hyundai, have reported production shortfalls of approximately 15-20% relative to pre-shortage output levels. Conversely, the consumer electronics segment has demonstrated a more robust recovery, with leading manufacturers reporting near-normal inventory levels. The ISTA attributes this disparity to the prioritization of high-margin, cutting-edge chips by foundries such as TSMC and Samsung, which align more closely with consumer electronics demand. To mitigate future vulnerabilities, several governments have announced substantial investments in domestic semiconductor manufacturing capabilities. The United States CHIPS Act has allocated $52 billion, while the European Union's Chips Act commits €43 billion to bolster regional production capacity. Industry analysts caution, however, that these facilities will require three to five years to become fully operational.`,
    level: 800,
    category: 'news article',
    questions: [
      {
        id: 1,
        question: 'What is the current state of the semiconductor shortage?',
        choices: [
          'It has been completely resolved',
          'It shows signs of gradual improvement',
          'It is worsening significantly',
          'It has had no impact on industries'
        ],
        answer: 1,
        explanation: '「shows signs of gradual alleviation」と述べられており、徐々に改善の兆しが見られるという状態です。'
      },
      {
        id: 2,
        question: 'Why has the automotive sector been more severely affected?',
        choices: [
          'Automakers failed to order chips in advance',
          'The sector relies on older chip designs',
          'Cars require more semiconductors than other products',
          'Government regulations restricted chip allocation'
        ],
        answer: 1,
        explanation: '「its reliance on legacy chip architectures」と記載されており、自動車業界はレガシーチップアーキテクチャへの依存が原因で大きな影響を受けています。'
      },
      {
        id: 3,
        question: 'What can be inferred about the government investments mentioned?',
        choices: [
          'They will immediately solve the shortage',
          'They are focused only on consumer electronics',
          'They represent a long-term strategic response',
          'They have been criticized as insufficient'
        ],
        answer: 2,
        explanation: '施設が完全稼働するまで3〜5年かかるとあり、これらの投資が短期的な解決策ではなく長期的な戦略的対応であることが推測できます。'
      },
      {
        id: 4,
        question: 'The word "disparity" in the passage is closest in meaning to:',
        choices: [
          'Similarity',
          'Difference',
          'Connection',
          'Decline'
        ],
        answer: 1,
        explanation: '「disparity」は「格差、不均衡」という意味で、「difference」が最も近いです。自動車と家電の回復状況の差を指しています。'
      },
      {
        id: 5,
        question: 'Which of the following is NOT stated in the report?',
        choices: [
          'TSMC prioritizes high-margin chips',
          'The US CHIPS Act allocated $52 billion',
          'Full recovery is expected before next year',
          'Hyundai reported production shortfalls'
        ],
        answer: 2,
        explanation: '「full recovery to pre-shortage supply levels is unlikely before the second half of next year」とあり、来年前半までの完全回復は見込めないとされています。来年前に回復するとは述べられていません。'
      }
    ]
  },
  {
    id: 23,
    title: 'Employee Relocation Assistance Program',
    passage: `Dear Ms. Nguyen,

On behalf of Atlas Global Partners, I am pleased to confirm your transfer to our Singapore regional headquarters, effective March 15. As outlined during your recent consultation with Human Resources, your relocation package includes the following provisions: temporary corporate housing for up to 90 days upon arrival, a lump-sum relocation allowance of $18,000 to cover moving expenses, and reimbursement of up to $5,000 for visa and immigration processing fees. Additionally, your spouse will be eligible for our Accompanying Partner Employment Assistance program, which provides career counseling and job placement services for a period of six months. Please note that the relocation allowance is subject to applicable tax withholdings in accordance with both U.S. and Singaporean tax regulations. Our tax advisory partner, Greenfield & Associates, will schedule a complimentary consultation to assist you in understanding your cross-border tax obligations. We kindly request that you submit all relocation-related receipts within 60 days of your arrival to expedite reimbursement processing. Should you have any questions or require additional assistance during this transition, please do not hesitate to contact your dedicated relocation coordinator, James Park, at j.park@atlasglobal.com.

Best regards,
Catherine Webb
Vice President, Human Resources`,
    level: 800,
    category: 'letter',
    questions: [
      {
        id: 1,
        question: 'What is the primary purpose of this letter?',
        choices: [
          'To offer a new job position',
          'To confirm relocation details and benefits',
          'To request additional documentation',
          'To announce a change in company policy'
        ],
        answer: 1,
        explanation: 'この手紙はMs. Nguyenのシンガポールへの転勤を確認し、移転パッケージの詳細を説明することが主な目的です。'
      },
      {
        id: 2,
        question: 'How long can Ms. Nguyen stay in corporate housing?',
        choices: [
          'Up to 30 days',
          'Up to 60 days',
          'Up to 90 days',
          'Up to 6 months'
        ],
        answer: 2,
        explanation: '「temporary corporate housing for up to 90 days upon arrival」と記載されており、最大90日間の社宅が提供されます。'
      },
      {
        id: 3,
        question: 'What benefit is available for Ms. Nguyen\'s spouse?',
        choices: [
          'A relocation allowance of $18,000',
          'Free language classes',
          'Career counseling and job placement services',
          'Temporary corporate housing for one year'
        ],
        answer: 2,
        explanation: '配偶者には「career counseling and job placement services」が6ヶ月間提供されるAccompanying Partner Employment Assistanceプログラムが利用可能です。'
      },
      {
        id: 4,
        question: 'What is the deadline for submitting relocation receipts?',
        choices: [
          'Within 30 days of arrival',
          'Within 60 days of arrival',
          'Within 90 days of arrival',
          'Before the transfer date'
        ],
        answer: 1,
        explanation: '「submit all relocation-related receipts within 60 days of your arrival」と明記されており、到着後60日以内が期限です。'
      },
      {
        id: 5,
        question: 'What can be inferred about the tax situation?',
        choices: [
          'Ms. Nguyen will not owe any taxes on the allowance',
          'The relocation involves tax complexities across two countries',
          'Greenfield & Associates will handle all tax filing',
          'Singapore has no income tax'
        ],
        answer: 1,
        explanation: '米国とシンガポールの税法に基づく源泉徴収の対象であり、国際税務の相談が提供されることから、2カ国間の税務の複雑さが推測できます。'
      }
    ]
  },
  {
    id: 24,
    title: 'Annual Cybersecurity Threat Assessment',
    passage: `The National Cybersecurity Advisory Board has published its annual threat assessment, highlighting a dramatic 67% increase in ransomware attacks targeting critical infrastructure over the past twelve months. The report identifies healthcare institutions, energy utilities, and municipal water treatment facilities as the most vulnerable sectors, noting that many of these organizations operate on outdated systems with insufficient security protocols. Of particular concern is the emergence of so-called "double extortion" tactics, wherein attackers not only encrypt victims' data but also threaten to publish sensitive information unless additional payments are made. The average ransom demand has escalated to $4.3 million, a 41% increase from the previous year. The Board recommends a multi-layered defense strategy encompassing regular system patching, implementation of zero-trust network architectures, mandatory multi-factor authentication, and comprehensive employee security awareness training. Furthermore, the report urges organizations to establish and regularly test incident response plans, emphasizing that the average time to detect a breach currently stands at 197 days—a figure the Board characterizes as "wholly unacceptable." Legislative proposals to mandate minimum cybersecurity standards for critical infrastructure operators are currently under review in Congress.`,
    level: 800,
    category: 'business report',
    questions: [
      {
        id: 1,
        question: 'What is the main finding of the annual threat assessment?',
        choices: [
          'Cybersecurity spending has decreased',
          'Ransomware attacks on critical infrastructure have surged',
          'Most organizations have adequate security measures',
          'Healthcare institutions are immune to cyber threats'
        ],
        answer: 1,
        explanation: '報告書の主な発見は、重要インフラを標的としたランサムウェア攻撃が67%増加したことです。'
      },
      {
        id: 2,
        question: 'What is "double extortion" in the context of this report?',
        choices: [
          'Attacking two organizations simultaneously',
          'Demanding ransom twice from the same victim',
          'Encrypting data and threatening to publish it',
          'Using two types of malware in one attack'
        ],
        answer: 2,
        explanation: '「double extortion」とは、データの暗号化に加えて機密情報の公開をも脅迫する手法であると説明されています。'
      },
      {
        id: 3,
        question: 'The phrase "wholly unacceptable" is used to describe:',
        choices: [
          'The average ransom demand amount',
          'The lack of government regulation',
          'The average time to detect a security breach',
          'The number of ransomware attacks'
        ],
        answer: 2,
        explanation: '「wholly unacceptable」は侵害の検出に平均197日かかることを形容する表現として使われています。'
      },
      {
        id: 4,
        question: 'Which defense measure is NOT recommended by the Board?',
        choices: [
          'Regular system patching',
          'Zero-trust network architectures',
          'Paying ransom demands promptly',
          'Employee security awareness training'
        ],
        answer: 2,
        explanation: '身代金の迅速な支払いは推奨されていません。推奨されているのはパッチ適用、ゼロトラスト、多要素認証、従業員研修です。'
      },
      {
        id: 5,
        question: 'What can be inferred about the current state of cybersecurity legislation?',
        choices: [
          'Strict laws are already in place',
          'New mandatory standards are being considered',
          'Congress has rejected all proposals',
          'Legislation is not needed'
        ],
        answer: 1,
        explanation: '「Legislative proposals to mandate minimum cybersecurity standards...are currently under review in Congress」とあり、新しい義務的基準が検討中であると推測できます。'
      }
    ]
  },
  {
    id: 25,
    title: 'Merger Integration Progress Report',
    passage: `Six months following the completion of the Apex-Broadline merger, the integration steering committee is pleased to report substantial progress across key operational workstreams. The consolidation of overlapping product lines has been executed ahead of schedule, resulting in a streamlined portfolio of 47 offerings—down from a combined 83 pre-merger. This rationalization is projected to yield annual cost savings of approximately $120 million once fully realized. The IT systems integration, however, remains the most challenging aspect of the merger. Migrating Broadline's proprietary enterprise resource planning system to Apex's SAP-based platform has encountered unforeseen compatibility issues, necessitating an additional investment of $35 million and extending the projected completion date by four months. Human capital integration has proceeded with carefully managed sensitivity. Of the 2,400 redundant positions identified during due diligence, 1,850 have been addressed through a combination of voluntary early retirement packages, internal redeployment, and natural attrition, with only 550 involuntary separations. Employee satisfaction surveys conducted in the third month post-merger indicated an overall engagement score of 68%, which the committee considers acceptable given the magnitude of organizational change. The committee recommends continued investment in cultural alignment initiatives to sustain morale through the remaining integration phases.`,
    level: 800,
    category: 'business report',
    questions: [
      {
        id: 1,
        question: 'What aspect of the merger is behind schedule?',
        choices: [
          'Product line consolidation',
          'IT systems integration',
          'Human capital integration',
          'Cultural alignment initiatives'
        ],
        answer: 1,
        explanation: 'IT systems integrationについて「extending the projected completion date by four months」と述べられており、予定より遅れています。'
      },
      {
        id: 2,
        question: 'How were most redundant positions handled?',
        choices: [
          'Through mass layoffs',
          'Through voluntary measures and natural attrition',
          'By outsourcing to contractors',
          'By transferring to overseas offices'
        ],
        answer: 1,
        explanation: '2,400の冗長ポジションのうち1,850は早期退職、社内再配置、自然減によって対処され、非自発的な離職は550件のみでした。'
      },
      {
        id: 3,
        question: 'The word "rationalization" in the passage is closest in meaning to:',
        choices: [
          'Justification',
          'Streamlining and simplification',
          'Expansion',
          'Explanation'
        ],
        answer: 1,
        explanation: 'この文脈での「rationalization」は製品ラインの合理化・効率化を意味し、「streamlining and simplification」が最も近いです。'
      },
      {
        id: 4,
        question: 'What is the projected annual cost savings from product consolidation?',
        choices: [
          '$35 million',
          '$83 million',
          '$120 million',
          '$155 million'
        ],
        answer: 2,
        explanation: '「projected to yield annual cost savings of approximately $120 million」と明記されています。'
      },
      {
        id: 5,
        question: 'What can be inferred about the committee\'s view of the employee engagement score?',
        choices: [
          'They consider it excellent',
          'They find it satisfactory under the circumstances',
          'They believe it indicates a major problem',
          'They think it is too high to be accurate'
        ],
        answer: 1,
        explanation: '「the committee considers acceptable given the magnitude of organizational change」とあり、大きな変革の中では妥当と考えていることが推測できます。'
      }
    ]
  },
  {
    id: 26,
    title: 'International Trade Conference Keynote',
    passage: `At the opening session of the 15th Annual International Trade and Commerce Summit held in Geneva, keynote speaker Dr. Amara Okafor, Director of the World Economic Policy Institute, delivered a provocative address challenging prevailing assumptions about globalization. Dr. Okafor argued that the traditional model of trade liberalization, which emphasizes tariff reduction and free movement of capital, has reached a critical inflection point. "We are witnessing a fundamental realignment of global supply chains," she declared, "driven not solely by economic efficiency but increasingly by geopolitical considerations, national security imperatives, and environmental sustainability concerns." She introduced the concept of "resilient multilateralism," a framework that advocates for diversified trade partnerships while maintaining commitments to international cooperation. The framework proposes the establishment of regional trade clusters that operate under harmonized but not identical regulatory standards, allowing for greater flexibility in addressing local economic conditions. Dr. Okafor acknowledged that her proposal would face resistance from proponents of unrestricted free trade, but contended that the vulnerabilities exposed by recent global disruptions—from pandemics to military conflicts—have rendered the purely efficiency-driven model untenable. The address was met with a standing ovation, though several delegates from export-dependent economies expressed reservations during the subsequent panel discussion.`,
    level: 800,
    category: 'news article',
    questions: [
      {
        id: 1,
        question: 'What is Dr. Okafor\'s main argument?',
        choices: [
          'Free trade should be completely abandoned',
          'Traditional trade liberalization needs fundamental rethinking',
          'Tariffs should be increased globally',
          'Globalization has been entirely beneficial'
        ],
        answer: 1,
        explanation: 'Dr. Okaforは従来の貿易自由化モデルが転換点に達しており、「resilient multilateralism」という新しい枠組みを提唱しています。'
      },
      {
        id: 2,
        question: 'What factors are driving the realignment of global supply chains according to Dr. Okafor?',
        choices: [
          'Only economic efficiency',
          'Geopolitical, security, and environmental concerns',
          'Consumer demand changes',
          'Technology advances alone'
        ],
        answer: 1,
        explanation: '「driven not solely by economic efficiency but increasingly by geopolitical considerations, national security imperatives, and environmental sustainability concerns」と述べられています。'
      },
      {
        id: 3,
        question: 'The word "untenable" in the passage is closest in meaning to:',
        choices: [
          'Sustainable',
          'Defensible',
          'Impossible to maintain',
          'Profitable'
        ],
        answer: 2,
        explanation: '「untenable」は「維持できない、擁護できない」という意味で、「impossible to maintain」が最も近いです。'
      },
      {
        id: 4,
        question: 'What does "resilient multilateralism" propose?',
        choices: [
          'A single global regulatory standard',
          'Complete economic isolation',
          'Regional trade clusters with harmonized but flexible standards',
          'Elimination of all trade agreements'
        ],
        answer: 2,
        explanation: '「regional trade clusters that operate under harmonized but not identical regulatory standards」と説明されており、調和されたが柔軟な基準による地域貿易クラスターを提案しています。'
      },
      {
        id: 5,
        question: 'What can be inferred about the audience\'s reaction?',
        choices: [
          'Everyone unanimously supported the proposal',
          'The response was largely positive but not without dissent',
          'The audience was completely opposed',
          'No one understood the presentation'
        ],
        answer: 1,
        explanation: 'スタンディングオベーションがあった一方で、輸出依存国の代表が懸念を表明したとあり、概ね好意的だが全員一致ではなかったと推測できます。'
      }
    ]
  },
  {
    id: 27,
    title: 'Product Recall Notice',
    passage: `Zenith Home Appliances, Inc. is issuing a voluntary recall of its Model Z-4500 Series Smart Thermostat units manufactured between January and August of this year. Approximately 145,000 units sold across North America are affected. The recall follows the identification of a firmware defect that, under specific conditions, may cause the device's temperature sensor to provide inaccurate readings, potentially resulting in excessive heating or cooling cycles. While no injuries have been reported to date, Zenith has determined that the defect poses a potential fire hazard in installations where the thermostat is connected to older, non-compliant HVAC systems lacking independent thermal cutoff mechanisms. Affected consumers are advised to immediately disconnect their Z-4500 units from their HVAC systems and contact Zenith's dedicated recall hotline at 1-800-555-0199 or visit www.zenithrecall.com to schedule a free replacement. Replacement units incorporating the corrected firmware are expected to be available within four to six weeks. In the interim, Zenith will provide affected customers with a complimentary basic thermostat to maintain climate control functionality. Zenith CEO Robert Dawson issued a formal apology, stating: "Consumer safety is our paramount concern, and we deeply regret any inconvenience this recall may cause."`,
    level: 800,
    category: 'press release',
    questions: [
      {
        id: 1,
        question: 'What is the cause of the recall?',
        choices: [
          'A battery defect causing overheating',
          'A firmware defect affecting temperature sensor accuracy',
          'A manufacturing flaw in the housing material',
          'A wireless connectivity issue'
        ],
        answer: 1,
        explanation: '「a firmware defect that...may cause the device\'s temperature sensor to provide inaccurate readings」と記載されており、ファームウェアの欠陥が原因です。'
      },
      {
        id: 2,
        question: 'Under what specific condition does the defect pose a fire hazard?',
        choices: [
          'When connected to any HVAC system',
          'When used in commercial buildings',
          'When connected to older systems without thermal cutoffs',
          'When Wi-Fi connectivity is lost'
        ],
        answer: 2,
        explanation: '「in installations where the thermostat is connected to older, non-compliant HVAC systems lacking independent thermal cutoff mechanisms」と特定の条件が記載されています。'
      },
      {
        id: 3,
        question: 'What should affected consumers do first?',
        choices: [
          'Wait for the replacement unit',
          'Update the thermostat firmware',
          'Disconnect the unit from their HVAC system',
          'File a complaint with consumer protection'
        ],
        answer: 2,
        explanation: '「Affected consumers are advised to immediately disconnect their Z-4500 units from their HVAC systems」と、まず接続を外すよう指示されています。'
      },
      {
        id: 4,
        question: 'The word "paramount" in the passage is closest in meaning to:',
        choices: [
          'Minor',
          'Secondary',
          'Most important',
          'Occasional'
        ],
        answer: 2,
        explanation: '「paramount」は「最も重要な、最高の」という意味で、「most important」が最も近いです。'
      },
      {
        id: 5,
        question: 'What is NOT offered to affected customers?',
        choices: [
          'A free replacement unit',
          'A complimentary basic thermostat',
          'A monetary refund',
          'A dedicated recall hotline'
        ],
        answer: 2,
        explanation: '無料交換品、無料の基本サーモスタット、専用リコールホットラインは言及されていますが、金銭的な返金は言及されていません。'
      }
    ]
  },
  {
    id: 28,
    title: 'Pharmaceutical Clinical Trial Results',
    passage: `BioVantage Therapeutics today announced the publication of Phase III clinical trial results for Nexoril, its investigational treatment for moderate-to-severe rheumatoid arthritis. The randomized, double-blind, placebo-controlled study enrolled 1,847 patients across 112 sites in 14 countries over a 52-week period. Results demonstrated that patients receiving Nexoril achieved a statistically significant improvement in the primary endpoint, with 62% attaining ACR50 response criteria compared to 27% in the placebo group (p<0.001). Secondary endpoints, including reduction in joint erosion progression and improvement in patient-reported quality of life measures, were also met with high statistical significance. The safety profile was generally consistent with earlier-phase trials, though investigators noted a slightly elevated incidence of upper respiratory tract infections among Nexoril recipients (8.4% versus 5.1% in the placebo arm). No serious adverse events attributable to the study drug were reported. BioVantage Chief Medical Officer Dr. Hannah Reeves expressed confidence that these results support a regulatory submission to the FDA within the current quarter, with potential approval anticipated by mid-next year. If approved, Nexoril would represent the first biologic therapy to target the novel IL-23/Th17 pathway specifically in rheumatoid arthritis treatment.`,
    level: 800,
    category: 'press release',
    questions: [
      {
        id: 1,
        question: 'What was the primary finding of the clinical trial?',
        choices: [
          'Nexoril had no significant effect compared to placebo',
          'Nexoril showed statistically significant improvement in the primary endpoint',
          'The trial was terminated due to safety concerns',
          'Nexoril was only effective in mild cases'
        ],
        answer: 1,
        explanation: '主要エンドポイントにおいてNexoril群は62%がACR50基準を達成し、プラセボ群の27%と比較して統計的に有意な改善を示しました。'
      },
      {
        id: 2,
        question: 'What safety concern was identified?',
        choices: [
          'Serious adverse events were common',
          'A higher rate of upper respiratory infections',
          'Liver damage in some patients',
          'Severe allergic reactions'
        ],
        answer: 1,
        explanation: '「a slightly elevated incidence of upper respiratory tract infections」が安全性に関する懸念として報告されています。'
      },
      {
        id: 3,
        question: 'What would make Nexoril unique if approved?',
        choices: [
          'It would be the cheapest rheumatoid arthritis treatment',
          'It would be the first biologic targeting the IL-23/Th17 pathway for RA',
          'It would cure rheumatoid arthritis permanently',
          'It would be the first oral biologic therapy'
        ],
        answer: 1,
        explanation: '「the first biologic therapy to target the novel IL-23/Th17 pathway specifically in rheumatoid arthritis treatment」と記載されています。'
      },
      {
        id: 4,
        question: 'The phrase "double-blind" refers to:',
        choices: [
          'Two separate trials conducted simultaneously',
          'Neither patients nor investigators knew who received the drug',
          'The study was conducted in two phases',
          'Two different dosages were tested'
        ],
        answer: 1,
        explanation: '「double-blind」とは、患者も研究者もどちらが薬剤を受けたか知らない設計を意味し、バイアスを防ぐための標準的な臨床試験手法です。'
      },
      {
        id: 5,
        question: 'When does BioVantage expect to submit for FDA approval?',
        choices: [
          'Immediately following the publication',
          'Within the current quarter',
          'By mid-next year',
          'After conducting a Phase IV trial'
        ],
        answer: 1,
        explanation: '「a regulatory submission to the FDA within the current quarter」と述べられており、今四半期中にFDAへの申請を予定しています。承認見込みが来年半ばです。'
      }
    ]
  },
  {
    id: 29,
    title: 'Urban Transportation Modernization Plan',
    passage: `The Metropolitan Transit Authority has unveiled a $14.8 billion comprehensive modernization plan designed to transform the city's aging public transportation infrastructure over the next decade. The plan, developed in consultation with international urban planning experts and community stakeholders, prioritizes three transformative initiatives. First, the construction of a 42-mile light rail network connecting the downtown core to underserved suburban communities, with an estimated ridership of 180,000 daily passengers upon completion. Second, the electrification of the entire bus fleet, replacing 3,200 diesel vehicles with zero-emission electric buses by 2032. Third, the deployment of an integrated digital fare system utilizing contactless payment technology across all transit modes. Funding for the plan derives from a combination of federal infrastructure grants ($6.1 billion), municipal bonds ($5.2 billion), and a proposed 0.5% sales tax increase that requires voter approval in the November referendum. Critics have questioned the financial projections, arguing that inflation and construction delays could inflate costs by 25-30%. Additionally, some community groups have expressed concern that the light rail construction may displace residents in historically marginalized neighborhoods. Transit Authority Chair Olivia Mendez acknowledged these concerns but maintained that the plan includes robust community benefit agreements and anti-displacement provisions designed to protect vulnerable populations.`,
    level: 800,
    category: 'news article',
    questions: [
      {
        id: 1,
        question: 'What is the total cost of the modernization plan?',
        choices: [
          '$6.1 billion',
          '$5.2 billion',
          '$14.8 billion',
          '$11.3 billion'
        ],
        answer: 2,
        explanation: '「a $14.8 billion comprehensive modernization plan」と冒頭に明記されています。'
      },
      {
        id: 2,
        question: 'Which funding source requires public approval?',
        choices: [
          'Federal infrastructure grants',
          'Municipal bonds',
          'A proposed sales tax increase',
          'Private sector investment'
        ],
        answer: 2,
        explanation: '「a proposed 0.5% sales tax increase that requires voter approval in the November referendum」と記載されています。'
      },
      {
        id: 3,
        question: 'What concern have community groups raised?',
        choices: [
          'The plan does not include electric buses',
          'The digital fare system is too complex',
          'Light rail construction may displace residents',
          'The plan is too short-term'
        ],
        answer: 2,
        explanation: '「the light rail construction may displace residents in historically marginalized neighborhoods」というのがコミュニティグループの懸念です。'
      },
      {
        id: 4,
        question: 'The word "transformative" in the passage is closest in meaning to:',
        choices: [
          'Temporary',
          'Minor',
          'Causing major change',
          'Traditional'
        ],
        answer: 2,
        explanation: '「transformative」は「大きな変革をもたらす」という意味で、「causing major change」が最も近いです。'
      },
      {
        id: 5,
        question: 'What is NOT one of the three main initiatives?',
        choices: [
          'Light rail network construction',
          'Bus fleet electrification',
          'Highway expansion',
          'Digital fare system deployment'
        ],
        answer: 2,
        explanation: '3つの主要イニシアチブはライトレール、バスの電化、デジタル運賃システムです。高速道路の拡張は含まれていません。'
      }
    ]
  },
  {
    id: 30,
    title: 'Data Privacy Compliance Letter',
    passage: `Dear Valued Clients,

We are writing to inform you of significant updates to our data handling practices in response to the recently enacted Global Data Protection Regulation (GDPR-II), which takes effect on July 1. As your trusted financial services provider, Meridian Capital Management is committed to maintaining the highest standards of data privacy and security for all client information. Effective immediately, we have implemented enhanced data encryption protocols utilizing AES-256 encryption for all stored client data and end-to-end TLS 1.3 encryption for data in transit. Additionally, we have appointed a dedicated Chief Data Protection Officer, Ms. Ingrid Steffensen, who will oversee compliance across all jurisdictions in which we operate. Under the new regulation, you have expanded rights concerning your personal data, including the right to request a comprehensive data audit detailing precisely what information we hold, the purposes for which it is processed, and all third parties with whom it has been shared. You may also exercise your right to data portability, enabling seamless transfer of your financial records to another institution. To facilitate these requests, we have established a secure online portal accessible at privacy.meridiancap.com. We encourage all clients to review the updated Privacy Policy and Terms of Service, available on our website, at their earliest convenience.

Sincerely,
David Morales
Chief Compliance Officer`,
    level: 800,
    category: 'letter',
    questions: [
      {
        id: 1,
        question: 'What prompted these changes to data handling practices?',
        choices: [
          'A data breach at the company',
          'Client complaints about privacy',
          'New data protection legislation (GDPR-II)',
          'An internal audit recommendation'
        ],
        answer: 2,
        explanation: '「in response to the recently enacted Global Data Protection Regulation (GDPR-II)」と記載されており、新しいデータ保護法が変更のきっかけです。'
      },
      {
        id: 2,
        question: 'What encryption standard is used for stored data?',
        choices: [
          'TLS 1.3',
          'AES-128',
          'AES-256',
          'RSA-2048'
        ],
        answer: 2,
        explanation: '「AES-256 encryption for all stored client data」と明記されています。保存データにはAES-256が使用されています。'
      },
      {
        id: 3,
        question: 'What is the right to "data portability"?',
        choices: [
          'The right to delete all personal data',
          'The right to transfer financial records to another institution',
          'The right to access data from any device',
          'The right to encrypt personal data'
        ],
        answer: 1,
        explanation: '「your right to data portability, enabling seamless transfer of your financial records to another institution」と説明されており、データの移転権です。'
      },
      {
        id: 4,
        question: 'What role has Ms. Ingrid Steffensen been appointed to?',
        choices: [
          'Chief Compliance Officer',
          'Chief Data Protection Officer',
          'Chief Information Officer',
          'Chief Security Officer'
        ],
        answer: 1,
        explanation: '「a dedicated Chief Data Protection Officer, Ms. Ingrid Steffensen」と記載されています。'
      },
      {
        id: 5,
        question: 'What is NOT mentioned as a client right under the new regulation?',
        choices: [
          'Requesting a comprehensive data audit',
          'Transferring records to another institution',
          'Receiving compensation for data misuse',
          'Knowing which third parties access their data'
        ],
        answer: 2,
        explanation: 'データ監査の要求、記録の移転、第三者との共有情報の確認は言及されていますが、データ誤用に対する補償は言及されていません。'
      }
    ]
  },
  {
    id: 31,
    title: 'Technology Product Review: Aether Pro Laptop',
    passage: `The Aether Pro 16, the flagship laptop from newcomer Aether Computing, represents an audacious attempt to challenge established players in the premium notebook market. Priced at $2,499 for the base configuration, the device features a custom ARM-based processor that Aether claims delivers performance comparable to leading x86 chips while consuming 40% less power. In our benchmark testing, these claims proved largely substantiated: the Aether Pro 16 consistently outperformed the latest MacBook Pro in multi-threaded workloads and matched it in single-core performance, while achieving an impressive 18 hours of battery life under mixed-use conditions. The 16-inch mini-LED display is nothing short of stunning, with a peak brightness of 1,600 nits and exceptional color accuracy that will satisfy professional content creators. Build quality is exemplary, with a machined aluminum chassis that weighs a mere 1.68 kilograms. Where the Aether Pro 16 falters, however, is in its software ecosystem. The proprietary AetherOS, while visually polished and responsive, suffers from a limited application library. Key professional applications, including Adobe Creative Suite and Microsoft Office, are available only through emulation, which introduces noticeable latency and occasional compatibility issues. Until this software gap is addressed, the Aether Pro 16 remains a tantalizing proposition rather than a wholehearted recommendation for productivity-focused professionals.`,
    level: 800,
    category: 'review',
    questions: [
      {
        id: 1,
        question: 'What is the reviewer\'s primary criticism of the Aether Pro 16?',
        choices: [
          'The display quality is insufficient',
          'The battery life is too short',
          'The software ecosystem is limited',
          'The build quality is poor'
        ],
        answer: 2,
        explanation: '「Where the Aether Pro 16 falters, however, is in its software ecosystem」と明確に述べられており、ソフトウェアエコシステムの制限が主な批判点です。'
      },
      {
        id: 2,
        question: 'How did the laptop perform in benchmark testing?',
        choices: [
          'It significantly underperformed competitors',
          'It performed comparably or better than leading competitors',
          'Results were inconclusive',
          'It only excelled in battery life tests'
        ],
        answer: 1,
        explanation: 'MacBook Proをマルチスレッドで上回り、シングルコアでは匹敵し、バッテリーは18時間という結果で、競合と同等以上の性能を示しました。'
      },
      {
        id: 3,
        question: 'The word "tantalizing" in the passage is closest in meaning to:',
        choices: [
          'Disappointing',
          'Confusing',
          'Tempting but not fully satisfying',
          'Completely satisfying'
        ],
        answer: 2,
        explanation: '「tantalizing」は「魅力的だが手に入らない」というニュアンスで、「tempting but not fully satisfying」が最も近いです。'
      },
      {
        id: 4,
        question: 'What issue affects Adobe Creative Suite on the Aether Pro 16?',
        choices: [
          'It is not compatible at all',
          'It runs through emulation with latency issues',
          'It requires an additional subscription',
          'It can only run on an external monitor'
        ],
        answer: 1,
        explanation: '「available only through emulation, which introduces noticeable latency and occasional compatibility issues」と記載されており、エミュレーションを通じての動作で遅延が生じます。'
      },
      {
        id: 5,
        question: 'What can be inferred about the reviewer\'s overall opinion?',
        choices: [
          'The product is completely unworthy of purchase',
          'The hardware is impressive but software holds it back',
          'It is the best laptop currently available',
          'The price is too high for what is offered'
        ],
        answer: 1,
        explanation: 'ハードウェアは高く評価しつつ、ソフトウェアの制限により全面的な推奨には至らないとしており、ハードは素晴らしいがソフトが足を引っ張っていると推測できます。'
      }
    ]
  },
  {
    id: 32,
    title: 'Corporate Restructuring Announcement',
    passage: `Effective April 1, Nexus Global Corporation will undergo a comprehensive organizational restructuring designed to enhance operational agility and better align business units with evolving market demands. The restructuring will consolidate the company's current seven regional divisions into four strategic business units organized by function rather than geography: Enterprise Solutions, Consumer Products, Digital Services, and Infrastructure. Each unit will operate as a semi-autonomous entity with its own profit-and-loss accountability, reporting directly to the newly created position of Chief Operating Officer. The Board has appointed internally promoted executive Sarah Blackwell to this role, citing her 15-year track record of consistent revenue growth in the Asia-Pacific division. The restructuring is expected to eliminate approximately 800 management positions globally, representing roughly 5% of the total workforce. Affected employees will receive severance packages equivalent to two weeks' salary per year of service, plus extended healthcare benefits for up to 12 months. Nexus has also partnered with outplacement firm CareerBridge to provide comprehensive job search assistance for displaced workers. CEO Michael Torres emphasized that the restructuring is proactive rather than reactive: "We are making these changes from a position of strength to ensure Nexus remains competitive in an increasingly dynamic marketplace." The company expects to realize $200 million in annual savings once the transition is complete.`,
    level: 800,
    category: 'press release',
    questions: [
      {
        id: 1,
        question: 'How is the company being reorganized?',
        choices: [
          'From functional divisions to regional divisions',
          'From regional divisions to functional business units',
          'From four units to seven divisions',
          'From domestic to international focus'
        ],
        answer: 1,
        explanation: '「consolidate the company\'s current seven regional divisions into four strategic business units organized by function rather than geography」と記載されています。'
      },
      {
        id: 2,
        question: 'Why was Sarah Blackwell chosen as COO?',
        choices: [
          'She was recommended by an external search firm',
          'She has experience in a competing company',
          'She has a 15-year record of revenue growth in Asia-Pacific',
          'She was the only internal candidate available'
        ],
        answer: 2,
        explanation: '「citing her 15-year track record of consistent revenue growth in the Asia-Pacific division」と、彼女のアジア太平洋地域での15年間の実績が根拠として挙げられています。'
      },
      {
        id: 3,
        question: 'What support is offered to displaced employees?',
        choices: [
          'Only severance packages',
          'Severance, extended healthcare, and job search assistance',
          'Internal transfer to other positions only',
          'Early retirement packages exclusively'
        ],
        answer: 1,
        explanation: '退職金、最大12ヶ月の医療保険延長、そしてCareerBridgeを通じた求職支援が提供されると記載されています。'
      },
      {
        id: 4,
        question: 'The word "agility" in the passage is closest in meaning to:',
        choices: [
          'Profitability',
          'Stability',
          'Flexibility and responsiveness',
          'Size and scale'
        ],
        answer: 2,
        explanation: '「operational agility」の「agility」は「機敏さ、柔軟性」を意味し、「flexibility and responsiveness」が最も近いです。'
      },
      {
        id: 5,
        question: 'What does CEO Torres mean by "proactive rather than reactive"?',
        choices: [
          'The restructuring is in response to financial losses',
          'The changes are being made in anticipation of future needs',
          'The company is reacting to competitor actions',
          'The restructuring was demanded by regulators'
        ],
        answer: 1,
        explanation: '「We are making these changes from a position of strength」と述べており、財務的な問題への対応ではなく、将来のニーズを見据えた先手を打つ措置であることを意味しています。'
      }
    ]
  },
  {
    id: 33,
    title: 'Workplace Wellness Program Evaluation',
    passage: `The enclosed report summarizes the findings of a comprehensive two-year evaluation of Cascade Financial Group's workplace wellness program, "Thrive Together," which was implemented in January of the preceding year. The evaluation, conducted by independent health consultancy WellBeing Analytics, employed a mixed-methods approach combining quantitative health metrics analysis with qualitative employee interviews. Key findings indicate that program participants demonstrated a 31% reduction in reported stress-related absenteeism and a 19% improvement in self-assessed mental health scores compared to non-participants. Biometric screening data revealed statistically significant improvements in blood pressure readings and cholesterol levels among the participant cohort. From a financial perspective, the program's annual operating cost of $2.8 million was offset by an estimated $4.5 million reduction in healthcare claims and productivity losses, yielding a return on investment of approximately 1.6:1. However, the evaluation identified notable disparities in program uptake across demographics. Participation rates among employees aged 25-34 were considerably lower (28%) compared to those aged 45-54 (67%), suggesting that program content and delivery mechanisms may not adequately address the preferences of younger workers. The evaluation recommends incorporating digital wellness platforms, gamification elements, and peer-led support groups to improve engagement among underrepresented demographics. Management has endorsed these recommendations and authorized an additional $400,000 in funding for program enhancement.`,
    level: 800,
    category: 'business report',
    questions: [
      {
        id: 1,
        question: 'What was the return on investment of the wellness program?',
        choices: [
          '1:1',
          '1.6:1',
          '2.8:1',
          '4.5:1'
        ],
        answer: 1,
        explanation: '「yielding a return on investment of approximately 1.6:1」と明記されています。'
      },
      {
        id: 2,
        question: 'What demographic had the lowest participation rate?',
        choices: [
          'Employees aged 45-54',
          'Employees aged 35-44',
          'Employees aged 25-34',
          'Employees aged 55-64'
        ],
        answer: 2,
        explanation: '「Participation rates among employees aged 25-34 were considerably lower (28%)」と記載されており、25〜34歳の参加率が最も低いです。'
      },
      {
        id: 3,
        question: 'What methodology was used for the evaluation?',
        choices: [
          'Only quantitative analysis',
          'Only qualitative interviews',
          'A combination of quantitative and qualitative methods',
          'A simple employee satisfaction survey'
        ],
        answer: 2,
        explanation: '「a mixed-methods approach combining quantitative health metrics analysis with qualitative employee interviews」と説明されています。'
      },
      {
        id: 4,
        question: 'What is NOT recommended to improve younger employee engagement?',
        choices: [
          'Digital wellness platforms',
          'Gamification elements',
          'Mandatory participation requirements',
          'Peer-led support groups'
        ],
        answer: 2,
        explanation: 'デジタルウェルネスプラットフォーム、ゲーミフィケーション、ピアサポートグループは推奨されていますが、強制参加は言及されていません。'
      },
      {
        id: 5,
        question: 'What can be inferred about management\'s view of the program?',
        choices: [
          'They plan to discontinue it',
          'They consider it successful and worth expanding',
          'They are indifferent to the results',
          'They believe it costs too much'
        ],
        answer: 1,
        explanation: '経営陣は推奨事項を承認し、追加資金40万ドルを承認したとあり、プログラムを成功とみなし拡大に値すると考えていると推測できます。'
      }
    ]
  },
  {
    id: 34,
    title: 'International Shipping Policy Update',
    passage: `Dear Esteemed Partners,

Following extensive deliberation, Oceanic Freight Solutions is pleased to announce a series of policy updates that will take effect beginning the first of next month, designed to streamline our international shipping operations and provide greater transparency to our valued partners. Foremost among these changes is the introduction of a dynamic pricing model that replaces our current fixed-rate structure. Under the new system, shipping rates will be calculated based on real-time factors including fuel costs, port congestion indices, seasonal demand fluctuations, and route-specific risk assessments. While we anticipate that rates during off-peak periods will decrease by approximately 8-12%, peak-season surcharges may increase by up to 15%. To assist partners in managing budgetary planning, we will provide 30-day advance rate forecasts through our enhanced digital logistics platform, FreightConnect Pro. Additionally, we are implementing a revised claims adjudication process that reduces the standard resolution timeline from 45 days to 21 business days for standard claims and 10 business days for expedited claims filed through FreightConnect Pro. Partners who maintain annual shipping volumes exceeding $5 million will automatically qualify for our Preferred Partner tier, which includes dedicated account management, priority loading, and a 3% volume discount. We encourage all partners to attend the virtual information sessions scheduled for next week, during which our operations team will provide detailed guidance on navigating these transitions.

Regards,
Yuki Harada
Senior Vice President, Global Operations`,
    level: 800,
    category: 'letter',
    questions: [
      {
        id: 1,
        question: 'What is the major pricing change being introduced?',
        choices: [
          'A flat rate reduction across all routes',
          'A shift from fixed rates to dynamic pricing',
          'Elimination of all surcharges',
          'Currency-based pricing adjustments'
        ],
        answer: 1,
        explanation: '「the introduction of a dynamic pricing model that replaces our current fixed-rate structure」と記載されており、固定料金からダイナミックプライシングへの移行です。'
      },
      {
        id: 2,
        question: 'What factors determine rates under the new system?',
        choices: [
          'Only fuel costs and demand',
          'Fuel costs, port congestion, seasonal demand, and route risk',
          'Distance and weight only',
          'Historical pricing data exclusively'
        ],
        answer: 1,
        explanation: '「shipping rates will be calculated based on real-time factors including fuel costs, port congestion indices, seasonal demand fluctuations, and route-specific risk assessments」と4つの要因が挙げられています。'
      },
      {
        id: 3,
        question: 'How has the claims resolution process changed?',
        choices: [
          'The timeline has been extended',
          'The timeline has been significantly shortened',
          'Claims can no longer be filed',
          'Only expedited claims are accepted'
        ],
        answer: 1,
        explanation: '標準クレームの解決時間が45日から21営業日に、迅速クレームは10営業日に短縮されました。'
      },
      {
        id: 4,
        question: 'What qualifies a partner for the Preferred Partner tier?',
        choices: [
          'Five years of continuous partnership',
          'Annual shipping volumes exceeding $5 million',
          'Using FreightConnect Pro exclusively',
          'Attending all virtual information sessions'
        ],
        answer: 1,
        explanation: '「Partners who maintain annual shipping volumes exceeding $5 million will automatically qualify for our Preferred Partner tier」と記載されています。'
      },
      {
        id: 5,
        question: 'What can be inferred about the off-peak and peak rate changes?',
        choices: [
          'All partners will pay less overall',
          'Some partners may see increased costs during busy periods',
          'Rates will remain the same as before',
          'Only Preferred Partners will benefit from off-peak discounts'
        ],
        answer: 1,
        explanation: 'オフピーク時は8-12%の減少が見込まれる一方、ピーク時は最大15%の追加料金があるため、繁忙期にはコストが増加するパートナーもいると推測できます。'
      }
    ]
  }
];
