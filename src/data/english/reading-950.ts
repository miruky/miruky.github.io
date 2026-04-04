import { ReadingPassage } from './types';

export const readingPassages950: ReadingPassage[] = [
  {
    id: 35,
    title: 'The Paradox of Algorithmic Transparency',
    passage: `In the burgeoning field of artificial intelligence governance, the demand for algorithmic transparency has emerged as a cornerstone of regulatory discourse. Proponents argue that making the inner workings of AI systems accessible to external scrutiny is indispensable for ensuring accountability and mitigating bias. However, this ostensibly straightforward proposition belies a far more intricate reality. Full transparency can inadvertently compromise proprietary intellectual property, expose systems to adversarial exploitation, and overwhelm non-specialist stakeholders with impenetrable technical minutiae. Moreover, the very notion of "transparency" remains philosophically contentious; revealing source code or training data does not necessarily engender comprehension of emergent model behaviors. Recent scholarship has proposed a nuanced alternative: "meaningful transparency," which prioritizes contextually relevant disclosures over exhaustive technical exposure. Under this framework, organizations would be obligated to furnish stakeholders with interpretable explanations of how algorithmic decisions affect them, without divulging the entirety of their proprietary architectures. Critics contend that this approach grants corporations excessive discretion in determining what constitutes "meaningful" disclosure, potentially perpetuating the very opacity it purports to address. The tension between these perspectives underscores a fundamental challenge: reconciling the democratic imperative for public oversight with the commercial and security exigencies that militate against unrestricted openness. As regulatory bodies across jurisdictions grapple with this dilemma, the articulation of workable standards remains an elusive yet urgent objective.`,
    level: 950,
    category: 'academic article',
    questions: [
      {
        id: 1,
        question: 'What is the main argument of the passage?',
        choices: [
          'Full algorithmic transparency should be mandated by law.',
          'Algorithmic transparency involves complex trade-offs that defy simple solutions.',
          'Corporations should never be required to disclose their AI systems.',
          'Meaningful transparency is universally accepted as the best approach.'
        ],
        answer: 1,
        explanation: '本文はアルゴリズムの透明性が単純な解決策では対処できない複雑なトレードオフを伴うことを論じています。完全な透明性の問題点と「意味のある透明性」の代替案の両方を提示し、どちらにも課題があることを示しています。'
      },
      {
        id: 2,
        question: 'According to the passage, what is a potential drawback of full algorithmic transparency?',
        choices: [
          'It reduces the cost of developing AI systems.',
          'It may expose systems to adversarial exploitation.',
          'It simplifies regulatory compliance procedures.',
          'It eliminates all forms of algorithmic bias.'
        ],
        answer: 1,
        explanation: '本文では、完全な透明性が「adversarial exploitation（敵対的な悪用）」にシステムをさらす可能性があると明記されています。'
      },
      {
        id: 3,
        question: 'The word "belies" in the passage is closest in meaning to:',
        choices: [
          'supports',
          'contradicts',
          'simplifies',
          'illustrates'
        ],
        answer: 1,
        explanation: '「belies」は「～と矛盾する、～の真実を隠す」という意味です。ここでは、一見わかりやすい提案が実際にはもっと複雑な現実を隠していることを示しています。'
      },
      {
        id: 4,
        question: 'What can be inferred about "meaningful transparency" from the passage?',
        choices: [
          'It has been universally adopted by regulatory bodies.',
          'It completely resolves the tension between openness and proprietary concerns.',
          'It attempts to balance informational needs with practical constraints.',
          'It was rejected by all scholars in the field.'
        ],
        answer: 2,
        explanation: '「意味のある透明性」は、技術的な全面開示ではなく、文脈に関連する開示を優先するフレームワークであり、情報のニーズと実際の制約のバランスを取ろうとしていることが推測できます。'
      },
      {
        id: 5,
        question: 'Which of the following is NOT stated in the passage?',
        choices: [
          'Revealing source code does not guarantee understanding of model behavior.',
          'Regulatory bodies have already established universal transparency standards.',
          'Critics worry that meaningful transparency may perpetuate opacity.',
          'Full transparency can compromise proprietary intellectual property.'
        ],
        answer: 1,
        explanation: '本文では、規制当局が普遍的な透明性基準をすでに確立したとは述べておらず、むしろ「workable standards remains an elusive yet urgent objective（実行可能な基準は依然として捉えどころのない緊急の目標）」と述べています。'
      }
    ]
  },
  {
    id: 36,
    title: 'Amendment to Cross-Border Data Processing Agreement',
    passage: `This Amendment ("Amendment") is entered into as of the date last signed below and modifies the Cross-Border Data Processing Agreement ("Agreement") dated January 15, 2024, between Meridian Technologies International, Ltd. ("Controller") and Apex Cloud Solutions GmbH ("Processor"). WHEREAS, the parties acknowledge that evolving regulatory requirements under the European Union's General Data Protection Regulation and analogous jurisdictional frameworks necessitate revisions to the existing data processing protocols; and WHEREAS, the Controller has expanded its operations into additional territories, thereby increasing the volume and complexity of personal data subject to cross-border transfer; NOW, THEREFORE, the parties agree as follows: Section 3.2 of the Agreement shall be amended to require the Processor to implement supplementary technical safeguards, including but not limited to end-to-end encryption employing AES-256 standards, pseudonymization of all personally identifiable information prior to cross-border transmission, and real-time anomaly detection mechanisms. Section 5.1 shall be revised to mandate that the Processor notify the Controller of any data breach within twenty-four hours of detection, reduced from the previously stipulated seventy-two-hour window. Furthermore, Section 7.4 shall incorporate a new provision requiring annual third-party audits conducted by an independent assessor accredited under ISO 27001. The Processor shall bear all costs associated with such audits unless the audit reveals material non-compliance attributable to the Controller's instructions. All other terms and conditions of the Agreement shall remain in full force and effect.`,
    level: 950,
    category: 'legal document',
    questions: [
      {
        id: 1,
        question: 'What is the primary purpose of this document?',
        choices: [
          'To terminate the existing data processing agreement.',
          'To modify specific provisions of an existing cross-border data processing agreement.',
          'To establish a new partnership between two companies.',
          'To outline the Controller\'s expansion strategy.'
        ],
        answer: 1,
        explanation: 'この文書は既存のクロスボーダーデータ処理契約の特定の条項を修正するための修正条項です。冒頭で「modifies the Cross-Border Data Processing Agreement」と明記されています。'
      },
      {
        id: 2,
        question: 'Under the amendment, how quickly must the Processor report a data breach?',
        choices: [
          'Within 12 hours of detection.',
          'Within 24 hours of detection.',
          'Within 48 hours of detection.',
          'Within 72 hours of detection.'
        ],
        answer: 1,
        explanation: '修正後の第5.1条により、プロセッサーは検出から24時間以内にデータ侵害を通知する義務があります（従来の72時間から短縮）。'
      },
      {
        id: 3,
        question: 'The word "stipulated" in the passage is closest in meaning to:',
        choices: [
          'suggested',
          'specified',
          'estimated',
          'prohibited'
        ],
        answer: 1,
        explanation: '「stipulated」は「規定された、明記された」という意味で、「specified（指定された）」が最も近い意味です。'
      },
      {
        id: 4,
        question: 'What can be inferred about the relationship between the two parties?',
        choices: [
          'They are competitors in the cloud services market.',
          'The Processor has previously failed to comply with data protection requirements.',
          'They have an ongoing business relationship that predates this amendment.',
          'The Controller is a subsidiary of the Processor.'
        ],
        answer: 2,
        explanation: 'この修正条項は2024年1月15日付の既存の契約を修正するものであり、両当事者がこの修正以前から継続的なビジネス関係を持っていることが推測できます。'
      },
      {
        id: 5,
        question: 'Which of the following is NOT required under the amendment?',
        choices: [
          'End-to-end encryption using AES-256 standards.',
          'Pseudonymization of personally identifiable information.',
          'Quarterly internal audits conducted by the Processor.',
          'Annual third-party audits by an ISO 27001 accredited assessor.'
        ],
        answer: 2,
        explanation: '修正条項では年次の第三者監査（annual third-party audits）は要求されていますが、四半期ごとの内部監査（quarterly internal audits）については言及されていません。'
      }
    ]
  },
  {
    id: 37,
    title: 'Nextera Holdings Annual Performance Review',
    passage: `Nextera Holdings delivered a robust financial performance in fiscal year 2025, achieving consolidated revenue of $14.7 billion, representing a year-over-year increase of 8.3%. This growth was principally driven by the accelerated adoption of our enterprise software solutions, which contributed $6.2 billion in recurring subscription revenue—a 14.1% increase from the prior fiscal year. Operating income reached $2.9 billion, yielding an operating margin of 19.7%, up from 17.4% in fiscal year 2024. The margin expansion was attributable to disciplined cost management, the realization of synergies from the Quantum Analytics acquisition completed in Q2 2024, and favorable shifts in our revenue mix toward higher-margin cloud-native offerings. Notwithstanding these achievements, the company confronted headwinds in its legacy hardware division, where revenue declined 6.8% to $3.1 billion amid intensifying competitive pressures and secular market contraction. Capital expenditures totaled $1.8 billion, directed predominantly toward expanding our hyperscale data center infrastructure in the Asia-Pacific region and augmenting our cybersecurity capabilities. Free cash flow generation remained strong at $3.4 billion, enabling the company to execute $1.2 billion in share repurchases and increase the quarterly dividend by 12%. Looking ahead, management anticipates consolidated revenue growth of 6-8% in fiscal year 2026, predicated on continued momentum in cloud services and the anticipated launch of our generative AI platform in the third quarter. However, macroeconomic uncertainties and potential regulatory developments in key markets warrant a measure of prudential caution.`,
    level: 950,
    category: 'annual report',
    questions: [
      {
        id: 1,
        question: 'What was the primary driver of Nextera Holdings\' revenue growth?',
        choices: [
          'Expansion of the legacy hardware division.',
          'Accelerated adoption of enterprise software solutions.',
          'Increased capital expenditures on data centers.',
          'Revenue from the generative AI platform.'
        ],
        answer: 1,
        explanation: '本文では、成長が主にエンタープライズソフトウェアソリューションの導入加速によって推進されたと明記されています。'
      },
      {
        id: 2,
        question: 'What happened to the legacy hardware division\'s revenue?',
        choices: [
          'It increased by 6.8%.',
          'It remained stable year-over-year.',
          'It declined by 6.8% to $3.1 billion.',
          'It was divested during the fiscal year.'
        ],
        answer: 2,
        explanation: '本文では、レガシーハードウェア部門の収益が6.8%減少して31億ドルになったと明記されています。'
      },
      {
        id: 3,
        question: 'The word "predicated" in the passage is closest in meaning to:',
        choices: [
          'predicted',
          'prevented',
          'based',
          'excluded'
        ],
        answer: 2,
        explanation: '「predicated on」は「～に基づいて、～を前提として」という意味で、「based on」が最も近い意味です。'
      },
      {
        id: 4,
        question: 'What can be inferred about the company\'s strategic direction?',
        choices: [
          'The company is shifting focus toward cloud and AI-based solutions.',
          'The company plans to increase investment in its hardware division.',
          'The company intends to reduce its dividend payments.',
          'The company is withdrawing from the Asia-Pacific market.'
        ],
        answer: 0,
        explanation: 'クラウドネイティブ製品への収益構成のシフト、データセンターインフラへの投資、生成AIプラットフォームの計画的な立ち上げから、クラウドとAIベースのソリューションへの戦略的転換が推測できます。'
      },
      {
        id: 5,
        question: 'Which of the following is NOT mentioned as a factor contributing to operating margin improvement?',
        choices: [
          'Disciplined cost management.',
          'Synergies from the Quantum Analytics acquisition.',
          'Increased pricing on existing products.',
          'Favorable shifts in revenue mix toward higher-margin offerings.'
        ],
        answer: 2,
        explanation: '営業利益率の改善要因として、コスト管理の徹底、買収によるシナジー、収益構成の変化は述べられていますが、既存製品の価格引き上げについては言及されていません。'
      }
    ]
  },
  {
    id: 38,
    title: 'The Erosion of Institutional Trust',
    passage: `The precipitous decline in public trust toward governmental and corporate institutions represents one of the most consequential sociopolitical phenomena of the early twenty-first century. While commentators frequently attribute this erosion to the proliferation of misinformation on digital platforms, such explanations, though not without merit, constitute an oversimplification of a multifaceted crisis. The roots of institutional distrust are deeply intertwined with decades of wage stagnation, the perceived capture of regulatory bodies by the very industries they are charged with overseeing, and a succession of high-profile scandals that have exposed the chasm between institutional rhetoric and actual conduct. Furthermore, the asymmetric recovery from the 2008 financial crisis—wherein bailed-out financial institutions returned to profitability while ordinary citizens bore the enduring consequences of austerity—crystallized a pervasive sense of systemic inequity. It is tempting to prescribe greater transparency as a panacea, yet transparency absent accountability merely furnishes additional evidence of institutional malfeasance without providing recourse. What is required is a fundamental reconceptualization of the social contract between institutions and the publics they serve. This entails not merely procedural reforms but substantive redistribution of decision-making authority, genuine mechanisms for redress, and demonstrable alignment between stated values and institutional behavior. Without such structural transformation, superficial measures risk exacerbating cynicism rather than restoring confidence. The stakes are considerable: democratic governance itself depends upon a minimum threshold of institutional legitimacy.`,
    level: 950,
    category: 'editorial',
    questions: [
      {
        id: 1,
        question: 'What is the author\'s primary purpose in writing this passage?',
        choices: [
          'To argue that misinformation is the sole cause of institutional distrust.',
          'To analyze the complex causes of declining institutional trust and argue for structural reform.',
          'To defend governmental institutions against unfair criticism.',
          'To propose specific legislative changes to address public mistrust.'
        ],
        answer: 1,
        explanation: '著者は制度的信頼の低下の複雑な原因を分析し、表面的な改革ではなく構造的な変革が必要であると主張しています。'
      },
      {
        id: 2,
        question: 'According to the passage, why is transparency alone insufficient?',
        choices: [
          'Because the public cannot understand complex institutional data.',
          'Because transparency without accountability only provides more evidence of wrongdoing without remedy.',
          'Because institutions refuse to be transparent.',
          'Because digital platforms distort transparent information.'
        ],
        answer: 1,
        explanation: '本文では「transparency absent accountability merely furnishes additional evidence of institutional malfeasance without providing recourse」と述べており、説明責任なしの透明性は救済手段を提供せずに不正行為の証拠を増やすだけだと説明しています。'
      },
      {
        id: 3,
        question: 'The word "panacea" in the passage is closest in meaning to:',
        choices: [
          'temporary solution',
          'cure-all remedy',
          'dangerous risk',
          'complicated procedure'
        ],
        answer: 1,
        explanation: '「panacea」は「万能薬、すべての問題に対する解決策」という意味で、「cure-all remedy（万能の治療法）」が最も近い意味です。'
      },
      {
        id: 4,
        question: 'What does the passage suggest about the 2008 financial crisis?',
        choices: [
          'It was caused primarily by public mistrust of institutions.',
          'Its aftermath deepened public perception of systemic unfairness.',
          'It led to effective reforms that restored institutional trust.',
          'It affected financial institutions more severely than ordinary citizens.'
        ],
        answer: 1,
        explanation: '本文では、2008年の金融危機からの非対称的な回復が、体系的な不公平感を「crystallized（結晶化した）」と述べており、一般市民が緊縮策の影響を受け続けた一方で救済された金融機関は収益性を回復したことが示されています。'
      },
      {
        id: 5,
        question: 'Which of the following is NOT proposed by the author as a necessary measure?',
        choices: [
          'Redistribution of decision-making authority.',
          'Genuine mechanisms for redress.',
          'Increased regulation of digital platforms.',
          'Alignment between stated values and institutional behavior.'
        ],
        answer: 2,
        explanation: '著者は意思決定権限の再分配、救済メカニズム、価値観と行動の整合性を必要な措置として提案していますが、デジタルプラットフォームの規制強化については提案していません。'
      }
    ]
  },
  {
    id: 39,
    title: 'Quantum-Resistant Cryptographic Protocol Specification',
    passage: `This document specifies the technical requirements for implementing the Lattice-Based Key Encapsulation Mechanism (LB-KEM) within enterprise communication systems, in accordance with NIST Post-Quantum Cryptography Standard FIPS 205. The protocol supersedes legacy RSA and elliptic curve key exchange mechanisms, which are demonstrably vulnerable to cryptanalysis by sufficiently powerful quantum computers employing Shor's algorithm. LB-KEM derives its security from the computational intractability of the Learning With Errors (LWE) problem over structured lattices, for which no efficient quantum algorithm is presently known. Implementation shall conform to the following specifications: key generation must produce a public key not exceeding 1,568 bytes and a private key not exceeding 3,168 bytes, with encapsulation yielding a shared secret of 256 bits. The protocol mandates a minimum security level equivalent to 192 bits of classical security, corresponding to NIST Security Level 4. All implementations must incorporate constant-time execution to preclude timing-based side-channel attacks, and shall employ masking countermeasures against differential power analysis. Interoperability testing must demonstrate compatibility with TLS 1.3 handshake protocols through the designated hybrid key exchange extension, wherein a classical ECDH exchange operates concurrently with LB-KEM to provide defense-in-depth during the transitional period. Performance benchmarks shall not exceed a 15% latency overhead relative to incumbent ECDH-only implementations across representative network conditions. Compliance certification requires successful completion of both the Cryptographic Algorithm Validation Program and an independent penetration assessment.`,
    level: 950,
    category: 'technical specification',
    questions: [
      {
        id: 1,
        question: 'Why does LB-KEM replace RSA and elliptic curve mechanisms?',
        choices: [
          'Because RSA and elliptic curve methods are too slow for modern systems.',
          'Because RSA and elliptic curve methods are vulnerable to quantum computer attacks.',
          'Because LB-KEM requires less computational power than existing methods.',
          'Because regulatory bodies have banned RSA encryption.'
        ],
        answer: 1,
        explanation: '本文では、RSAと楕円曲線鍵交換メカニズムが「Shor\'s algorithmを使用する十分に強力な量子コンピュータによる暗号解読に脆弱」であると明記されています。'
      },
      {
        id: 2,
        question: 'What security measure is specified to prevent timing-based attacks?',
        choices: [
          'AES-256 encryption.',
          'Constant-time execution.',
          'Double key generation.',
          'Quantum random number generation.'
        ],
        answer: 1,
        explanation: '本文では「constant-time execution to preclude timing-based side-channel attacks」と、タイミングベースのサイドチャネル攻撃を防ぐために定時実行が必要と明記されています。'
      },
      {
        id: 3,
        question: 'The word "intractability" in the passage is closest in meaning to:',
        choices: [
          'simplicity',
          'difficulty of solving',
          'flexibility',
          'reversibility'
        ],
        answer: 1,
        explanation: '「intractability」は「解決困難性、扱いにくさ」という意味で、「difficulty of solving（解決の困難さ）」が最も近い意味です。LWE問題の計算上の解決困難性からセキュリティが導かれることを示しています。'
      },
      {
        id: 4,
        question: 'What can be inferred about the "hybrid key exchange" approach?',
        choices: [
          'It is a permanent replacement for all classical encryption.',
          'It is designed as a transitional measure combining classical and quantum-resistant methods.',
          'It eliminates the need for TLS 1.3 compatibility.',
          'It is only suitable for government communications.'
        ],
        answer: 1,
        explanation: '「transitional period（移行期間）」中にECDH交換とLB-KEMが同時に動作して「defense-in-depth（多層防御）」を提供することから、ハイブリッド鍵交換は古典的方法と量子耐性方法を組み合わせた過渡的措置であることが推測できます。'
      },
      {
        id: 5,
        question: 'Which of the following is NOT a requirement for compliance certification?',
        choices: [
          'Completion of the Cryptographic Algorithm Validation Program.',
          'An independent penetration assessment.',
          'Demonstration of backward compatibility with TLS 1.2.',
          'Interoperability testing with TLS 1.3 handshake protocols.'
        ],
        answer: 2,
        explanation: 'コンプライアンス認証にはCryptographic Algorithm Validation Programと独立したペネトレーション評価が必要ですが、TLS 1.2との後方互換性は要求されていません。TLS 1.3との互換性テストは述べられていますが、TLS 1.2については言及されていません。'
      }
    ]
  },
  {
    id: 40,
    title: 'Neuroplasticity and Second Language Acquisition in Adults',
    passage: `Contrary to the long-held critical period hypothesis, which posits that the neurological capacity for language acquisition diminishes irrevocably after puberty, converging evidence from neuroimaging studies has revealed that the adult brain retains substantial plasticity conducive to second language learning. Functional magnetic resonance imaging (fMRI) investigations demonstrate that intensive language training induces measurable structural changes in cortical regions associated with linguistic processing, including increased gray matter density in the left inferior frontal gyrus and enhanced white matter integrity in the arcuate fasciculus. These findings challenge the deterministic interpretation of age-related constraints and suggest instead a gradient model wherein acquisition difficulty increases progressively but never becomes categorically impossible. Crucially, the nature of instructional methodology appears to modulate the extent of neuroplastic adaptation. Immersive, contextually rich learning environments activate broader neural networks—encompassing sensorimotor, emotional, and social cognition circuits—than do decontextualized grammar-translation approaches, which predominantly engage declarative memory systems in the medial temporal lobe. This differential activation pattern has significant pedagogical implications: instructional designs that leverage multimodal input and socially embedded practice may partially compensate for the reduced automaticity of adult language processing. Nevertheless, important caveats remain. Individual variability in neuroplastic capacity is considerable, influenced by genetic factors, prior linguistic experience, cognitive reserve, and the typological distance between the first and target languages. Furthermore, achieving native-like phonological competence remains exceptionally challenging for adult learners, as the auditory cortex exhibits comparatively reduced plasticity for phonemic category formation after early childhood.`,
    level: 950,
    category: 'research summary',
    questions: [
      {
        id: 1,
        question: 'What is the main finding discussed in the passage?',
        choices: [
          'Adults cannot effectively learn second languages after puberty.',
          'The adult brain retains significant plasticity that supports second language learning.',
          'Grammar-translation methods are superior for adult learners.',
          'Native-like proficiency is easily achievable for adult language learners.'
        ],
        answer: 1,
        explanation: '本文の主な知見は、臨界期仮説に反して、成人の脳が第二言語学習を支える実質的な可塑性を保持していることです。'
      },
      {
        id: 2,
        question: 'According to the passage, what structural brain change results from intensive language training?',
        choices: [
          'Decreased activity in the prefrontal cortex.',
          'Increased gray matter density in the left inferior frontal gyrus.',
          'Reduced white matter in the temporal lobe.',
          'Expansion of the auditory cortex.'
        ],
        answer: 1,
        explanation: '本文では、集中的な言語訓練が「左下前頭回の灰白質密度の増加」を含む構造的変化を引き起こすと明記されています。'
      },
      {
        id: 3,
        question: 'The word "modulate" in the passage is closest in meaning to:',
        choices: [
          'eliminate',
          'regulate or influence',
          'prevent',
          'replicate'
        ],
        answer: 1,
        explanation: '「modulate」は「調整する、影響を与える」という意味で、「regulate or influence」が最も近い意味です。教授法が神経可塑的適応の程度に影響を与えることを示しています。'
      },
      {
        id: 4,
        question: 'What can be inferred about immersive learning environments compared to grammar-translation approaches?',
        choices: [
          'They are less effective for all adult learners.',
          'They engage a wider range of brain networks, potentially leading to better outcomes.',
          'They exclusively improve phonological competence.',
          'They are only effective for learners with high cognitive reserve.'
        ],
        answer: 1,
        explanation: '没入型学習環境は感覚運動、感情、社会認知回路を含むより広範な神経ネットワークを活性化するため、より良い結果につながる可能性があることが推測できます。'
      },
      {
        id: 5,
        question: 'Which of the following is NOT mentioned as a factor influencing individual variability in neuroplastic capacity?',
        choices: [
          'Genetic factors.',
          'Prior linguistic experience.',
          'Socioeconomic status.',
          'Typological distance between languages.'
        ],
        answer: 2,
        explanation: '個人の神経可塑的能力の変動要因として、遺伝的要因、言語経験、認知予備力、言語間の類型的距離が挙げられていますが、社会経済的地位については言及されていません。'
      }
    ]
  },
  {
    id: 41,
    title: 'Sovereign Debt Restructuring and Creditor Coordination',
    passage: `The contemporary architecture of sovereign debt restructuring remains fundamentally inadequate for addressing the scale and complexity of fiscal crises confronting emerging market economies. The absence of a statutory international bankruptcy framework for sovereigns means that debt workouts are conducted through ad hoc negotiations among heterogeneous creditor groups with divergent interests and disparate legal claims. The proliferation of bond financing—which has supplanted syndicated bank lending as the predominant vehicle for sovereign borrowing—has exponentially increased the coordination challenges, as bondholder anonymity and dispersal render collective action prohibitively difficult. Collective action clauses (CACs), now standard in international bond issuances, represent a partial amelioration insofar as they enable qualified majority voting on restructuring terms, thereby constraining holdout creditors who might otherwise litigate for full repayment. However, CACs operate within individual bond series and do not address the aggregation problem across multiple instruments. The introduction of single-limb aggregated CACs, pioneered in Eurozone sovereign bonds, constitutes a significant procedural advancement by permitting a single vote across all affected series, yet their adoption in non-Eurozone issuances remains inconsistent. Meanwhile, the growing participation of non-traditional creditors—including Chinese state-owned financial institutions with opaque lending practices and bilateral political considerations—has introduced additional layers of complexity. The Common Framework for Debt Treatments established under the G20 was intended to bridge these gaps, but its implementation has been glacially slow, plagued by disagreements over comparability of treatment and the reluctance of certain creditors to accept losses commensurate with their exposure.`,
    level: 950,
    category: 'academic article',
    questions: [
      {
        id: 1,
        question: 'What is the central problem described in the passage?',
        choices: [
          'Emerging market economies are borrowing too much money.',
          'The current framework for sovereign debt restructuring is inadequate for modern challenges.',
          'Bond financing has become too expensive for sovereign borrowers.',
          'Chinese lending institutions refuse to participate in debt restructuring.'
        ],
        answer: 1,
        explanation: '本文の中心的な問題は、ソブリン債務再編の現行アーキテクチャが新興市場経済が直面する財政危機の規模と複雑さに対処するには根本的に不十分であることです。'
      },
      {
        id: 2,
        question: 'Why has bond financing increased coordination challenges?',
        choices: [
          'Because bonds have higher interest rates than bank loans.',
          'Because bondholder anonymity and dispersal make collective action extremely difficult.',
          'Because bond markets are unregulated.',
          'Because bonds cannot be restructured under any legal framework.'
        ],
        answer: 1,
        explanation: '本文では、債券保有者の匿名性と分散が集団行動を「prohibitively difficult（事実上不可能なほど困難）」にしていると明記されています。'
      },
      {
        id: 3,
        question: 'The word "amelioration" in the passage is closest in meaning to:',
        choices: [
          'deterioration',
          'complication',
          'improvement',
          'elimination'
        ],
        answer: 2,
        explanation: '「amelioration」は「改善、改良」という意味で、「improvement」が最も近い意味です。CACsが完全な解決策ではないが部分的な改善であることを示しています。'
      },
      {
        id: 4,
        question: 'What can be inferred about single-limb aggregated CACs?',
        choices: [
          'They have been universally adopted in all sovereign bond markets.',
          'They represent progress but have not been consistently adopted outside the Eurozone.',
          'They have completely solved the holdout creditor problem.',
          'They were developed by Chinese financial institutions.'
        ],
        answer: 1,
        explanation: '単一ブランチ集約CACは「significant procedural advancement」であるが、「non-Eurozone issuancesでの採用がinconsistent」であると述べられており、進歩はあるがユーロ圏外では一貫して採用されていないことが推測できます。'
      },
      {
        id: 5,
        question: 'Which of the following is NOT stated as a reason for the G20 Common Framework\'s slow implementation?',
        choices: [
          'Disagreements over comparability of treatment.',
          'Reluctance of certain creditors to accept proportional losses.',
          'Insufficient funding from G20 member nations.',
          'The growing participation of non-traditional creditors.'
        ],
        answer: 2,
        explanation: 'G20共通フレームワークの実施遅延の理由として、待遇の同等性に関する意見の相違と特定の債権者の損失受け入れへの消極性が挙げられていますが、G20加盟国からの資金不足については述べられていません。'
      }
    ]
  },
  {
    id: 42,
    title: 'Liability Provisions for Autonomous Vehicle Operations',
    passage: `The following provisions govern the allocation of liability arising from incidents involving Level 4 and Level 5 autonomous vehicles ("AVs") operating within the jurisdiction. Section 12.1: Product Liability Framework. The manufacturer of an AV shall bear strict liability for any personal injury, property damage, or economic loss proximately caused by a defect in the autonomous driving system ("ADS"), including but not limited to deficiencies in perception algorithms, decision-making logic, or sensor hardware, provided that the ADS was operating within its designated operational design domain ("ODD") at the time of the incident. Section 12.2: Operator Liability. Where an AV is equipped with manual override capability, the human operator shall assume liability for incidents occurring during periods of manual control or where the operator fails to respond to a system-initiated handoff request within the manufacturer-specified response window. Section 12.3: Infrastructure Liability. The governmental entity responsible for roadway maintenance shall be liable for incidents attributable to infrastructure deficiencies—such as inadequate signage, malfunctioning traffic signals, or compromised road surfaces—that fall below the reasonable standard of maintenance and that the ADS could not reasonably have been expected to compensate for. Section 12.4: Shared Liability and Apportionment. In cases involving concurrent causation by multiple parties, liability shall be apportioned on a comparative fault basis as determined by the adjudicating tribunal. Section 12.5: Data Preservation Mandate. All parties operating AVs shall maintain continuous event data recorder logs for a minimum period of thirty-six months following any reportable incident, and failure to preserve such data shall create a rebuttable presumption of fault.`,
    level: 950,
    category: 'legal document',
    questions: [
      {
        id: 1,
        question: 'Under Section 12.1, when does the manufacturer bear strict liability?',
        choices: [
          'Whenever any accident involving the AV occurs.',
          'When a defect in the ADS causes harm while operating within the designated ODD.',
          'Only when the AV is operating in manual mode.',
          'When the human operator fails to take control.'
        ],
        answer: 1,
        explanation: '第12.1条では、ADSが指定されたODD内で動作している時に、ADSの欠陥が損害を引き起こした場合にメーカーが厳格責任を負うと規定されています。'
      },
      {
        id: 2,
        question: 'What happens if event data recorder logs are not preserved?',
        choices: [
          'The case is automatically dismissed.',
          'The manufacturer is exempt from liability.',
          'A rebuttable presumption of fault is created against the non-preserving party.',
          'The governmental entity assumes full liability.'
        ],
        answer: 2,
        explanation: '第12.5条では、データの保存を怠った場合、過失の反証可能な推定が生じると明記されています。'
      },
      {
        id: 3,
        question: 'The phrase "proximate cause" as used in the passage most likely refers to:',
        choices: [
          'any remote or indirect cause of an incident',
          'a cause that is sufficiently direct and closely related to the resulting harm',
          'a cause that occurs after the incident',
          'only physical contact between vehicles'
        ],
        answer: 1,
        explanation: '「proximate cause（近因）」は法律用語で、結果として生じた損害に十分に直接的かつ密接に関連する原因を指します。'
      },
      {
        id: 4,
        question: 'What can be inferred about the purpose of the "operational design domain" concept?',
        choices: [
          'It limits where AVs can be sold commercially.',
          'It defines the conditions under which the ADS is designed to function, establishing boundaries for manufacturer liability.',
          'It requires all roads to be upgraded for autonomous vehicle use.',
          'It eliminates the need for human operators in AVs.'
        ],
        answer: 1,
        explanation: 'ODDの概念は、ADSが機能するよう設計された条件を定義し、その範囲内での動作時にのみメーカーが厳格責任を負うことから、メーカーの責任範囲を画定する機能を持つことが推測できます。'
      },
      {
        id: 5,
        question: 'Which of the following scenarios is NOT explicitly covered by the liability provisions?',
        choices: [
          'An accident caused by a flaw in the AV\'s perception algorithms.',
          'An accident during a period of manual control by the operator.',
          'An accident caused by a cyberattack on the AV\'s communication system.',
          'An accident caused by a malfunctioning traffic signal.'
        ],
        answer: 2,
        explanation: '知覚アルゴリズムの欠陥、手動制御中の事故、信号機の故障は明示的にカバーされていますが、AVの通信システムへのサイバー攻撃については明示的に規定されていません。'
      }
    ]
  },
  {
    id: 43,
    title: 'Meridian Pharmaceuticals Strategic Outlook',
    passage: `Meridian Pharmaceuticals' fiscal year 2025 results reflect a pivotal transition as the company navigates patent expirations on its legacy cardiovascular portfolio while simultaneously scaling its oncology and immunology pipeline. Total revenue declined 3.2% to $22.4 billion, with losses from generic erosion of Cardiovex ($1.8 billion reduction) partially offset by the strong commercial launch of Oncolyx, our PD-L1 checkpoint inhibitor, which generated $3.7 billion in its first full year of availability. Research and development expenditure increased to $5.1 billion, representing 22.8% of revenue, as we advanced twelve compounds through late-stage clinical trials. The Phase III ILLUMINATE study for our bispecific antibody MRD-4720 in relapsed/refractory diffuse large B-cell lymphoma demonstrated a statistically significant improvement in overall survival (hazard ratio 0.68, p<0.001), positioning the compound for regulatory submission in Q3 2026. Geographically, our Asia-Pacific operations achieved 18.4% revenue growth, driven by expanded market access agreements in Japan, South Korea, and emerging Southeast Asian markets. Conversely, European revenue contracted 5.7% due to intensified pricing pressures under revised national health technology assessment frameworks. The Board has authorized a comprehensive portfolio optimization initiative, including the divestiture of our consumer health division, projected to generate approximately $4.2 billion in proceeds. These resources will be redeployed toward strategic bolt-on acquisitions in cell and gene therapy, consistent with our long-term vision of becoming the preeminent platform in precision medicine. Net income attributable to shareholders was $4.1 billion, representing earnings per diluted share of $7.83.`,
    level: 950,
    category: 'annual report',
    questions: [
      {
        id: 1,
        question: 'What is the main strategic challenge facing Meridian Pharmaceuticals?',
        choices: [
          'Declining demand for oncology treatments.',
          'Managing the transition from expiring legacy patents to new pipeline products.',
          'Excessive research and development spending.',
          'Inability to enter the Asia-Pacific market.'
        ],
        answer: 1,
        explanation: '本文は、レガシーの心血管ポートフォリオの特許切れからの移行と同時に腫瘍学・免疫学パイプラインの拡大を進めるという戦略的課題を中心に描かれています。'
      },
      {
        id: 2,
        question: 'What was notable about the ILLUMINATE study results?',
        choices: [
          'The study failed to meet its primary endpoint.',
          'It demonstrated statistically significant improvement in overall survival.',
          'The study was terminated early due to safety concerns.',
          'Results were inconclusive and require further investigation.'
        ],
        answer: 1,
        explanation: 'ILLUMINATE試験は全生存期間の統計的に有意な改善（ハザード比0.68、p<0.001）を実証したと明記されています。'
      },
      {
        id: 3,
        question: 'The word "divestiture" in the passage is closest in meaning to:',
        choices: [
          'acquisition',
          'expansion',
          'sale or disposal',
          'reorganization'
        ],
        answer: 2,
        explanation: '「divestiture」は「売却、処分」という意味で、「sale or disposal」が最も近い意味です。コンシューマーヘルス部門の売却を指しています。'
      },
      {
        id: 4,
        question: 'What can be inferred about Meridian\'s future strategy?',
        choices: [
          'The company plans to focus on consumer health products.',
          'The company is shifting toward precision medicine through cell and gene therapy.',
          'The company will withdraw from the European market.',
          'The company plans to reduce R&D spending significantly.'
        ],
        answer: 1,
        explanation: 'コンシューマーヘルス部門の売却と細胞・遺伝子治療への戦略的買収への資金再配分、精密医療の主要プラットフォームになるという長期ビジョンから、精密医療への転換が推測できます。'
      },
      {
        id: 5,
        question: 'Which of the following is NOT cited as a reason for European revenue decline?',
        choices: [
          'Intensified pricing pressures.',
          'Revised national health technology assessment frameworks.',
          'Loss of key distribution partnerships.',
          'Both A and B are cited as reasons.'
        ],
        answer: 2,
        explanation: '欧州の収益減少の理由として価格圧力の強化と改訂された医療技術評価フレームワークが挙げられていますが、主要流通パートナーシップの喪失については言及されていません。'
      }
    ]
  },
  {
    id: 44,
    title: 'The Ethics of Predictive Policing',
    passage: `The deployment of predictive policing algorithms in municipal law enforcement has ignited a contentious debate that lies at the intersection of public safety imperatives and civil liberties protections. Advocates contend that data-driven predictive models enable more efficient allocation of constrained law enforcement resources, directing patrols to high-probability crime locations and thereby achieving measurable reductions in certain crime categories. Empirical evaluations in several pilot jurisdictions have indeed documented modest decreases in property crime rates correlated with algorithm-guided deployment. However, critics marshal an equally compelling body of evidence demonstrating that these systems perpetuate and amplify existing patterns of discriminatory policing. Because predictive models are trained on historical crime data—data that inherently reflects decades of racially disproportionate enforcement practices—the algorithms systematically direct intensified surveillance toward communities of color, creating a pernicious feedback loop: increased policing generates more arrests, which produces more data points, which further concentrates future predictions in the same neighborhoods. This phenomenon, characterized in the academic literature as "runaway feedback," raises profound questions about whether ostensibly objective algorithmic systems can transcend the biases embedded in their training data. Moreover, the opacity of many proprietary prediction systems frustrates meaningful due process review, as individuals subjected to algorithm-influenced enforcement actions may have no practical means of challenging the evidentiary basis for their targeting. The fundamental tension remains unresolved: can predictive policing be reformed to serve equitable public safety goals, or is the technology inherently incompatible with principles of equal protection under the law?`,
    level: 950,
    category: 'editorial',
    questions: [
      {
        id: 1,
        question: 'What is the author\'s primary argument about predictive policing?',
        choices: [
          'Predictive policing algorithms are entirely beneficial for public safety.',
          'The technology presents a fundamental tension between efficiency and civil liberties that remains unresolved.',
          'Predictive policing should be immediately banned in all jurisdictions.',
          'The algorithms are too expensive for widespread implementation.'
        ],
        answer: 1,
        explanation: '著者は予測的ポリシングが効率性と市民的自由の間に根本的な緊張関係を提示し、それが未解決のままであると主張しています。'
      },
      {
        id: 2,
        question: 'What is "runaway feedback" as described in the passage?',
        choices: [
          'A technical malfunction in the prediction software.',
          'A cycle where biased policing produces biased data that further concentrates predictions in the same areas.',
          'Public backlash against law enforcement technology.',
          'The process of updating algorithms with new crime data.'
        ],
        answer: 1,
        explanation: '「暴走フィードバック」は、偏った取り締まりがより多くの逮捕を生み、それがさらにデータポイントを生成し、将来の予測を同じ地域にさらに集中させるサイクルとして説明されています。'
      },
      {
        id: 3,
        question: 'The word "marshal" in the passage is closest in meaning to:',
        choices: [
          'dismiss',
          'gather and organize',
          'contradict',
          'exaggerate'
        ],
        answer: 1,
        explanation: '「marshal」は「集める、整理する」という意味で、「gather and organize」が最も近い意味です。批判者が証拠を集めて提示することを示しています。'
      },
      {
        id: 4,
        question: 'What can be inferred about the empirical evidence for predictive policing?',
        choices: [
          'It conclusively proves that predictive policing reduces all forms of crime.',
          'It shows mixed results, with some benefits in property crime but concerns about discriminatory impacts.',
          'It demonstrates that the technology has no effect on crime rates.',
          'It has only been collected in a single jurisdiction.'
        ],
        answer: 1,
        explanation: '実証的証拠は、財産犯罪の減少には一定の効果があるものの、差別的影響に関する懸念もあるという混合的な結果を示していることが推測できます。'
      },
      {
        id: 5,
        question: 'Which of the following is NOT mentioned as a concern about predictive policing systems?',
        choices: [
          'They perpetuate racially disproportionate enforcement patterns.',
          'Their opacity frustrates due process review.',
          'They require excessive financial investment by municipalities.',
          'They create feedback loops that concentrate predictions in certain neighborhoods.'
        ],
        answer: 2,
        explanation: '人種的に不均衡な取り締まりパターンの永続化、不透明性による適正手続きの妨害、フィードバックループは懸念事項として述べられていますが、自治体による過度な財政投資は言及されていません。'
      }
    ]
  },
  {
    id: 45,
    title: 'Next-Generation Battery Management System Specification',
    passage: `This specification defines the functional and performance requirements for the Battery Management System (BMS) integrated within modular grid-scale energy storage installations rated at 10 MWh and above. The BMS shall provide continuous monitoring, control, and optimization of lithium iron phosphate (LFP) cell arrays configured in a hierarchical topology comprising cell-level, module-level, and pack-level management layers. Cell voltage measurement accuracy shall not deviate more than ±2 mV across the operating range of 2.5V to 3.65V, with a sampling frequency of no less than 10 Hz per cell. Temperature monitoring shall employ distributed fiber optic sensing with spatial resolution of 25 cm and measurement accuracy of ±0.5°C. The State of Charge (SoC) estimation algorithm shall achieve accuracy within ±2% across all operational conditions, utilizing an adaptive extended Kalman filter incorporating electrochemical impedance spectroscopy data for real-time model calibration. Passive and active cell balancing shall be supported concurrently, with active balancing achieving energy transfer efficiency exceeding 92% and maximum balancing current of 5A per module. The BMS shall implement a multi-tiered fault detection hierarchy: Level 1 warnings triggering parameter logging and operator notification, Level 2 alerts initiating automated power derating, and Level 3 faults executing immediate system isolation with thermal runaway propagation mitigation protocols. Communication interfaces shall support IEC 61850 for grid integration, Modbus TCP/IP for legacy SCADA compatibility, and a RESTful API for cloud-based analytics platforms. Mean time between failures for the BMS controller hardware shall exceed 100,000 hours under specified environmental conditions.`,
    level: 950,
    category: 'technical specification',
    questions: [
      {
        id: 1,
        question: 'What is the primary function of the BMS described in this specification?',
        choices: [
          'Manufacturing lithium iron phosphate cells.',
          'Continuous monitoring, control, and optimization of LFP cell arrays.',
          'Designing grid-scale energy storage facilities.',
          'Managing electrical distribution networks.'
        ],
        answer: 1,
        explanation: '仕様書では、BMSがLFPセルアレイの「continuous monitoring, control, and optimization（継続的な監視、制御、最適化）」を提供すると明記されています。'
      },
      {
        id: 2,
        question: 'What happens when a Level 3 fault is detected?',
        choices: [
          'Parameter logging and operator notification.',
          'Automated power derating.',
          'Immediate system isolation with thermal runaway mitigation protocols.',
          'A scheduled maintenance alert is generated.'
        ],
        answer: 2,
        explanation: 'レベル3障害は「immediate system isolation with thermal runaway propagation mitigation protocols（熱暴走伝播緩和プロトコルを伴う即時システム隔離）」を実行すると明記されています。'
      },
      {
        id: 3,
        question: 'The word "topology" in the passage is closest in meaning to:',
        choices: [
          'geography',
          'arrangement or configuration',
          'chemistry',
          'chronology'
        ],
        answer: 1,
        explanation: '「topology」はここでは「配置、構成」という意味で、セルレベル、モジュールレベル、パックレベルの管理層の階層的な構成を指しています。'
      },
      {
        id: 4,
        question: 'What can be inferred about the system\'s communication requirements?',
        choices: [
          'The system only needs to communicate with modern cloud platforms.',
          'The system must support both legacy industrial protocols and modern interfaces.',
          'IEC 61850 is the only required communication standard.',
          'The system does not require any external communication capability.'
        ],
        answer: 1,
        explanation: 'IEC 61850（グリッド統合用）、Modbus TCP/IP（レガシーSCADA互換性用）、RESTful API（クラウド分析用）をサポートする必要があることから、レガシー産業プロトコルと最新インターフェースの両方をサポートする必要があることが推測できます。'
      },
      {
        id: 5,
        question: 'Which of the following is NOT specified as a measurement requirement?',
        choices: [
          'Cell voltage accuracy of ±2 mV.',
          'Temperature accuracy of ±0.5°C.',
          'Humidity measurement accuracy of ±1%.',
          'SoC estimation accuracy of ±2%.'
        ],
        answer: 2,
        explanation: 'セル電圧精度、温度精度、SoC推定精度は仕様として記載されていますが、湿度測定精度は言及されていません。'
      }
    ]
  },
  {
    id: 46,
    title: 'Epigenetic Mechanisms in Transgenerational Stress Response',
    passage: `A growing corpus of evidence from both animal models and human epidemiological studies suggests that the biological consequences of severe psychological stress may extend beyond the directly exposed individual, manifesting in altered phenotypic and behavioral traits in subsequent generations through epigenetic mechanisms. This phenomenon, termed transgenerational epigenetic inheritance, challenges the traditional neo-Darwinian framework, which holds that acquired characteristics cannot be transmitted to offspring. In murine models, paternal exposure to chronic unpredictable stress has been shown to produce DNA methylation changes in sperm cells, particularly at loci regulating the hypothalamic-pituitary-adrenal (HPA) axis, which governs the neuroendocrine stress response. Remarkably, F1 and F2 offspring of stressed males exhibit heightened corticosterone reactivity and anxiety-like behaviors despite having no direct exposure to the stressor, and these phenotypic alterations correlate with conserved methylation patterns at the implicated genomic regions. Human studies, though necessarily observational and subject to confounding variables, have yielded convergent findings. Investigations of descendants of famine survivors and genocide victims have documented elevated rates of metabolic disorders, cardiovascular disease, and post-traumatic stress disorder, accompanied by distinctive epigenetic signatures in genes governing stress regulation and metabolic homeostasis. However, the mechanistic pathways by which environmentally induced epigenetic modifications survive the extensive chromatin remodeling that occurs during gametogenesis and early embryogenesis remain incompletely understood. Furthermore, disentangling genuinely epigenetic transmission from postnatal environmental influences—such as altered parenting behaviors exhibited by traumatized individuals—presents formidable methodological challenges that preclude definitive causal attribution in human populations.`,
    level: 950,
    category: 'research summary',
    questions: [
      {
        id: 1,
        question: 'What is the main topic of the passage?',
        choices: [
          'The genetic causes of psychological stress disorders.',
          'Evidence that stress-induced epigenetic changes may be transmitted across generations.',
          'New pharmaceutical treatments for post-traumatic stress disorder.',
          'The role of DNA methylation in normal development.'
        ],
        answer: 1,
        explanation: '本文の主なテーマは、ストレスによって誘発されたエピジェネティックな変化が世代を超えて伝達される可能性があるという証拠です。'
      },
      {
        id: 2,
        question: 'What was observed in the offspring of stressed male mice?',
        choices: [
          'Reduced anxiety behaviors and normal stress responses.',
          'Heightened corticosterone reactivity and anxiety-like behaviors.',
          'No measurable differences from control group offspring.',
          'Genetic mutations in stress-related genes.'
        ],
        answer: 1,
        explanation: 'ストレスを受けた雄マウスの子孫は「heightened corticosterone reactivity and anxiety-like behaviors（コルチコステロン反応性の亢進と不安様行動）」を示したと明記されています。'
      },
      {
        id: 3,
        question: 'The word "corpus" in the passage is closest in meaning to:',
        choices: [
          'corporation',
          'body or collection',
          'criticism',
          'contradiction'
        ],
        answer: 1,
        explanation: '「corpus」は「集合体、大量の資料」という意味で、「body or collection」が最も近い意味です。ここでは証拠の集積を指しています。'
      },
      {
        id: 4,
        question: 'Why are definitive causal claims difficult to make in human studies?',
        choices: [
          'Because human genome sequencing technology is not advanced enough.',
          'Because it is difficult to separate epigenetic transmission from postnatal environmental influences.',
          'Because human studies show no correlation with animal model results.',
          'Because ethical constraints prevent any human research on this topic.'
        ],
        answer: 1,
        explanation: '本文では、真のエピジェネティック伝達と出生後の環境的影響（トラウマを受けた個人の養育行動の変化など）を区別することが「formidable methodological challenges」を提示し、因果関係の帰属を妨げると説明しています。'
      },
      {
        id: 5,
        question: 'Which of the following is NOT mentioned as a health outcome observed in descendants of trauma survivors?',
        choices: [
          'Elevated rates of metabolic disorders.',
          'Cardiovascular disease.',
          'Autoimmune conditions.',
          'Post-traumatic stress disorder.'
        ],
        answer: 2,
        explanation: '代謝障害、心血管疾患、心的外傷後ストレス障害はトラウマ生存者の子孫で観察された健康上の結果として挙げられていますが、自己免疫疾患については言及されていません。'
      }
    ]
  },
  {
    id: 47,
    title: 'The Geopolitics of Critical Mineral Supply Chains',
    passage: `The accelerating global transition to renewable energy technologies has precipitated an acute reconfiguration of geopolitical power dynamics, centered on the control of critical mineral supply chains. Lithium, cobalt, rare earth elements, and other minerals essential for manufacturing electric vehicle batteries, wind turbines, and photovoltaic cells are characterized by extreme geographic concentration: the Democratic Republic of Congo supplies approximately 70% of the world's cobalt, China processes over 80% of the world's rare earth elements, and the "lithium triangle" of Chile, Argentina, and Bolivia contains more than half of known global lithium reserves. This concentration engenders vulnerabilities analogous to—and arguably exceeding—those historically associated with petroleum dependency. Unlike oil, for which substitutes and diversification strategies have been extensively developed over decades, many critical minerals have no viable substitutes in their key applications, and the capital-intensive, environmentally complex nature of mining operations imposes decade-long lead times on new supply development. China's strategic dominance extends beyond raw extraction to encompass the entirety of the midstream processing and refining value chain, conferring formidable leverage over downstream manufacturers regardless of where minerals are originally sourced. Western industrial democracies have belatedly recognized this strategic exposure, launching initiatives such as the EU Critical Raw Materials Act and the U.S. Inflation Reduction Act's domestic sourcing provisions. However, these measures confront the inescapable tension between the urgency of the energy transition and the protracted timelines required to establish resilient, geographically diversified supply chains. The risk of "green protectionism"—wherein critical mineral policies become instruments of trade confrontation rather than genuine supply security—further complicates an already fraught geopolitical landscape.`,
    level: 950,
    category: 'academic article',
    questions: [
      {
        id: 1,
        question: 'What is the central thesis of the passage?',
        choices: [
          'Renewable energy technology is too expensive to be widely adopted.',
          'The transition to renewable energy has created new geopolitical vulnerabilities centered on critical mineral supply chains.',
          'China should reduce its dominance in rare earth processing.',
          'Western countries have successfully diversified their critical mineral sources.'
        ],
        answer: 1,
        explanation: '本文の中心的な主張は、再生可能エネルギーへの移行が重要鉱物のサプライチェーンを中心とした新たな地政学的脆弱性を生み出したことです。'
      },
      {
        id: 2,
        question: 'According to the passage, how does critical mineral dependency differ from petroleum dependency?',
        choices: [
          'Critical minerals are less expensive than petroleum.',
          'Many critical minerals have no viable substitutes, and new supply takes much longer to develop.',
          'Petroleum is more geographically concentrated than critical minerals.',
          'Critical minerals are only used in military applications.'
        ],
        answer: 1,
        explanation: '本文では、石油と異なり多くの重要鉱物には実行可能な代替品がなく、新規供給開発に数十年のリードタイムがかかると説明しています。'
      },
      {
        id: 3,
        question: 'The word "precipitated" in the passage is closest in meaning to:',
        choices: [
          'prevented',
          'triggered or caused',
          'delayed',
          'predicted'
        ],
        answer: 1,
        explanation: '「precipitated」は「引き起こした、促進した」という意味で、「triggered or caused」が最も近い意味です。再生可能エネルギーへの移行が地政学的権力構造の再編を引き起こしたことを示しています。'
      },
      {
        id: 4,
        question: 'What can be inferred about China\'s strategic position in critical minerals?',
        choices: [
          'China\'s advantage is limited to raw mineral extraction.',
          'China\'s dominance spans the entire value chain from processing to refining, giving it leverage over manufacturers globally.',
          'China has recently lost its competitive position in rare earth processing.',
          'China\'s role is primarily as a consumer rather than a producer of critical minerals.'
        ],
        answer: 1,
        explanation: '中国の戦略的優位性は原材料の抽出だけでなく、中流の加工・精製バリューチェーン全体に及び、鉱物の産地に関わらず下流メーカーに対して強力なレバレッジを持つことが推測できます。'
      },
      {
        id: 5,
        question: 'Which of the following is NOT mentioned as a characteristic of critical mineral supply chains?',
        choices: [
          'Extreme geographic concentration of supply.',
          'Capital-intensive and environmentally complex mining operations.',
          'Abundant recycling infrastructure that reduces dependency on mining.',
          'Decade-long lead times for new supply development.'
        ],
        answer: 2,
        explanation: '供給の地理的集中、資本集約的で環境的に複雑な採掘事業、新規供給開発の長いリードタイムは言及されていますが、採掘への依存を減らす豊富なリサイクルインフラについては述べられていません。'
      }
    ]
  },
  {
    id: 48,
    title: 'Service Level Agreement for Managed Cloud Infrastructure',
    passage: `This Service Level Agreement ("SLA") establishes the performance commitments and remedial obligations of Stratos Cloud Services ("Provider") with respect to managed infrastructure services furnished to the Client under Master Services Agreement No. 2025-MC-4417. Section 2: Availability Commitment. The Provider guarantees a monthly uptime percentage of 99.99% for Tier 1 (mission-critical) workloads, measured as the total minutes in the calendar month minus minutes of Unscheduled Downtime, divided by the total minutes in the calendar month. Scheduled maintenance windows, not to exceed four hours per calendar quarter and communicated with a minimum of seventy-two hours advance notice, are excluded from the availability calculation. Section 3: Performance Metrics. API response latency for Tier 1 services shall not exceed 50 milliseconds at the 95th percentile, measured at the Provider's edge network ingress points. Data durability for object storage services shall be maintained at a minimum of 99.999999999% (eleven nines) per annum. Section 4: Service Credits. In the event the Provider fails to meet the stated availability commitment, the Client shall be entitled to service credits calculated as follows: monthly uptime between 99.95% and 99.99% entitles a credit of 10% of the monthly service fee for affected services; uptime between 99.0% and 99.95% entitles a credit of 25%; uptime below 99.0% entitles a credit of 50%. Service credits shall constitute the Client's sole and exclusive remedy for availability failures. Section 5: Exclusions. This SLA shall not apply to performance degradation attributable to force majeure events, Client-initiated configuration changes, third-party services not under the Provider's operational control, or usage exceeding documented capacity thresholds.`,
    level: 950,
    category: 'legal document',
    questions: [
      {
        id: 1,
        question: 'What availability level is guaranteed for Tier 1 workloads?',
        choices: [
          '99.9% monthly uptime.',
          '99.95% monthly uptime.',
          '99.99% monthly uptime.',
          '99.999% monthly uptime.'
        ],
        answer: 2,
        explanation: '第2条で、Tier 1（ミッションクリティカル）ワークロードに対して月間稼働率99.99%を保証すると明記されています。'
      },
      {
        id: 2,
        question: 'If the monthly uptime falls to 99.5%, what service credit does the Client receive?',
        choices: [
          '10% of the monthly service fee.',
          '25% of the monthly service fee.',
          '50% of the monthly service fee.',
          'Full refund of the monthly service fee.'
        ],
        answer: 1,
        explanation: '第4条により、稼働率が99.0%から99.95%の間の場合、影響を受けたサービスの月額料金の25%のクレジットが付与されます。99.5%はこの範囲に該当します。'
      },
      {
        id: 3,
        question: 'The word "remedial" in the passage is closest in meaning to:',
        choices: [
          'preventive',
          'corrective or compensatory',
          'punitive',
          'optional'
        ],
        answer: 1,
        explanation: '「remedial」は「是正的な、補償的な」という意味で、「corrective or compensatory」が最も近い意味です。SLA違反時にプロバイダーが負う是正・補償義務を指しています。'
      },
      {
        id: 4,
        question: 'What can be inferred about the Provider\'s liability for availability failures?',
        choices: [
          'The Provider has unlimited liability for all types of failures.',
          'The Provider\'s liability is capped at service credits, which are the Client\'s exclusive remedy.',
          'The Provider bears no financial responsibility for downtime.',
          'The Client can terminate the agreement immediately after any failure.'
        ],
        answer: 1,
        explanation: '「Service credits shall constitute the Client\'s sole and exclusive remedy」と記載されており、サービスクレジットがクライアントの唯一の排他的な救済手段であることから、プロバイダーの責任はサービスクレジットに上限付けられていることが推測できます。'
      },
      {
        id: 5,
        question: 'Which of the following is NOT listed as an exclusion from the SLA?',
        choices: [
          'Force majeure events.',
          'Client-initiated configuration changes.',
          'Provider\'s internal staffing shortages.',
          'Usage exceeding documented capacity thresholds.'
        ],
        answer: 2,
        explanation: '不可抗力、クライアントが開始した設定変更、文書化された容量閾値を超える使用はSLAの除外事項として記載されていますが、プロバイダー内部の人員不足は除外事項として挙げられていません。'
      }
    ]
  },
  {
    id: 49,
    title: 'Cognitive Biases in Venture Capital Decision-Making',
    passage: `Despite the ostensibly data-driven sophistication of modern venture capital, empirical research increasingly demonstrates that investment decisions remain profoundly susceptible to systematic cognitive biases. A comprehensive longitudinal study spanning fifteen years of investment data from 247 venture capital firms revealed that pattern-matching heuristics—the tendency to evaluate founding teams against the archetype of previously successful entrepreneurs—accounted for a statistically significant proportion of variance in investment outcomes, frequently to the detriment of portfolio diversification and returns. Specifically, investors exhibited a pronounced affinity bias, disproportionately funding founders who shared their educational background, professional network, or demographic characteristics, even when controlling for venture quality metrics. This homophily effect was particularly pronounced in early-stage investments where objective performance data is sparse, and decisions consequently rely more heavily on subjective evaluation. Confirmation bias further compounds these tendencies: once an initial positive impression is formed, investors selectively attend to corroborating evidence while discounting contradictory signals, a pattern that manifests in both due diligence processes and post-investment monitoring. The anchoring effect also exerts substantial influence, as initial valuation estimates established during preliminary discussions disproportionately constrain subsequent negotiation outcomes irrespective of intervening information. Intriguingly, more experienced investors did not exhibit reduced susceptibility to these biases; if anything, expertise appeared to increase confidence in intuitive judgments, thereby paradoxically amplifying bias effects. Structured decision-making frameworks—incorporating standardized evaluation criteria, blind initial screening, and mandatory devil's advocate protocols—have demonstrated efficacy in mitigating these biases in controlled experiments, yet their adoption across the venture capital industry remains limited, in part because the industry's prevailing culture valorizes instinct and pattern recognition as hallmarks of investment acuity.`,
    level: 950,
    category: 'research summary',
    questions: [
      {
        id: 1,
        question: 'What is the main finding of the research discussed in the passage?',
        choices: [
          'Venture capital decisions are highly rational and data-driven.',
          'Venture capital decisions are significantly influenced by systematic cognitive biases.',
          'Experienced investors make consistently better decisions than novices.',
          'Structured decision-making frameworks have been widely adopted in the industry.'
        ],
        answer: 1,
        explanation: '本文の主な知見は、ベンチャーキャピタルの投資判断が体系的な認知バイアスに大きく影響されていることです。'
      },
      {
        id: 2,
        question: 'According to the passage, what is the effect of investor experience on cognitive biases?',
        choices: [
          'Experience significantly reduces cognitive biases.',
          'Experience has no effect on cognitive biases.',
          'Experience may paradoxically increase bias by boosting confidence in intuitive judgments.',
          'Only inexperienced investors are affected by cognitive biases.'
        ],
        answer: 2,
        explanation: '本文では、経験豊富な投資家はバイアスへの感受性が低下せず、むしろ専門知識が直感的判断への自信を高め、「paradoxically amplifying bias effects（逆説的にバイアス効果を増幅する）」と述べています。'
      },
      {
        id: 3,
        question: 'The word "homophily" in the passage most likely refers to:',
        choices: [
          'hostility toward unfamiliar characteristics',
          'tendency to associate with similar individuals',
          'preference for diverse investment portfolios',
          'aversion to risk-taking in investments'
        ],
        answer: 1,
        explanation: '「homophily」は「同類性、類似した個人との結びつきの傾向」を指し、投資家が自分と似た教育背景、職業ネットワーク、人口統計的特性を持つ創業者に不均衡に資金を提供する傾向として文脈から理解できます。'
      },
      {
        id: 4,
        question: 'Why have structured decision-making frameworks not been widely adopted?',
        choices: [
          'They have been proven ineffective in controlled experiments.',
          'They are too expensive for most venture capital firms.',
          'The industry culture values instinct and pattern recognition over structured approaches.',
          'Regulatory bodies have prohibited their use.'
        ],
        answer: 2,
        explanation: '構造化された意思決定フレームワークの採用が限定的な理由として、業界の文化が「instinct and pattern recognition（直感とパターン認識）」を投資能力の証として重視していることが挙げられています。'
      },
      {
        id: 5,
        question: 'Which of the following is NOT identified as a cognitive bias affecting venture capital decisions?',
        choices: [
          'Affinity bias.',
          'Confirmation bias.',
          'Sunk cost fallacy.',
          'Anchoring effect.'
        ],
        answer: 2,
        explanation: '親和性バイアス、確証バイアス、アンカリング効果はベンチャーキャピタルの意思決定に影響する認知バイアスとして特定されていますが、埋没費用の誤謬（sunk cost fallacy）は言及されていません。'
      }
    ]
  },
  {
    id: 50,
    title: 'The Architecture of Digital Public Infrastructure',
    passage: `The concept of Digital Public Infrastructure (DPI) has gained considerable traction among policymakers and development economists as a paradigm for leveraging technology to deliver inclusive public services at population scale. DPI comprises three foundational layers: a digital identity system enabling authenticated transactions, an interoperable payments network facilitating seamless financial transfers, and a consent-based data exchange framework permitting individuals to share verified credentials across institutional boundaries. India's implementation—encompassing the Aadhaar biometric identity system, the Unified Payments Interface (UPI), and the DigiLocker document repository—is frequently cited as the archetypal case, having demonstrably expanded financial inclusion by enabling over 500 million previously unbanked individuals to access formal financial services. However, the replicability of this model in disparate institutional, technological, and cultural contexts warrants scrutiny. The efficacy of DPI is contingent upon several prerequisites that cannot be assumed as universal: robust telecommunications infrastructure, institutional capacity for governance and oversight, a legal framework establishing data protection rights, and sufficient digital literacy among the target population. Moreover, the centralization inherent in population-scale digital identity systems introduces surveillance risks that demand rigorous safeguards. The Aadhaar system itself has been subject to judicial challenge on privacy grounds, culminating in a landmark Supreme Court decision circumscribing its mandatory application. Proponents contend that these risks are manageable through appropriate institutional design, while skeptics argue that the power asymmetries intrinsic to centralized digital infrastructure are fundamentally incompatible with democratic accountability, particularly in states lacking robust judicial independence. The ongoing experimentation with federated and decentralized architecture models represents an attempt to reconcile these competing imperatives, though such approaches introduce their own complexities in coordination and standardization.`,
    level: 950,
    category: 'editorial',
    questions: [
      {
        id: 1,
        question: 'What is the author\'s primary purpose in this passage?',
        choices: [
          'To advocate for universal adoption of India\'s DPI model.',
          'To examine both the potential and the challenges of Digital Public Infrastructure.',
          'To argue that digital identity systems should be abolished.',
          'To explain the technical specifications of the Aadhaar system.'
        ],
        answer: 1,
        explanation: '著者はデジタル公共インフラの可能性と課題の両方を検討しており、一方的な擁護でも批判でもなくバランスの取れた分析を提供しています。'
      },
      {
        id: 2,
        question: 'What are the three foundational layers of DPI as described in the passage?',
        choices: [
          'Cloud computing, artificial intelligence, and blockchain.',
          'Digital identity, interoperable payments, and consent-based data exchange.',
          'Mobile networks, social media, and e-commerce platforms.',
          'Government databases, private sector APIs, and citizen portals.'
        ],
        answer: 1,
        explanation: '本文では、DPIの3つの基盤層として、デジタルIDシステム、相互運用可能な決済ネットワーク、同意ベースのデータ交換フレームワークが明記されています。'
      },
      {
        id: 3,
        question: 'The word "circumscribing" in the passage is closest in meaning to:',
        choices: [
          'expanding',
          'endorsing',
          'limiting or restricting',
          'implementing'
        ],
        answer: 2,
        explanation: '「circumscribing」は「制限する、限定する」という意味で、「limiting or restricting」が最も近い意味です。最高裁判決がAadhaarの義務的適用を制限したことを指しています。'
      },
      {
        id: 4,
        question: 'What can be inferred about the replicability of India\'s DPI model?',
        choices: [
          'It can be easily replicated in any country with minimal adaptation.',
          'It depends on prerequisites that may not exist in all contexts, making replication challenging.',
          'It has already been successfully replicated in all developing countries.',
          'It is only applicable to countries with over one billion people.'
        ],
        answer: 1,
        explanation: 'インドのDPIモデルの再現可能性は、堅牢な電気通信インフラ、制度的能力、法的枠組み、デジタルリテラシーなど、普遍的とは想定できない前提条件に依存しており、再現が困難であることが推測できます。'
      },
      {
        id: 5,
        question: 'Which of the following is NOT mentioned as a prerequisite for effective DPI implementation?',
        choices: [
          'Robust telecommunications infrastructure.',
          'A legal framework for data protection.',
          'International trade agreements with technology-exporting nations.',
          'Sufficient digital literacy among the target population.'
        ],
        answer: 2,
        explanation: '効果的なDPI実装の前提条件として、電気通信インフラ、データ保護の法的枠組み、デジタルリテラシーは挙げられていますが、技術輸出国との国際貿易協定は言及されていません。'
      }
    ]
  }
];
