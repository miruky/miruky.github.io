import type { ReadingCourse } from './types';

const course: ReadingCourse = {
  id: 'java',
  lessons: [
    // ===== BEGINNER (id 1-11) =====
    {
      id: 1,
      title: 'Clean Naming Conventions',
      titleJa: 'クリーンな命名規則',
      difficulty: 'beginner',
      category: 'Clean Code',
      description: 'Java の命名規約に従い、意図が伝わる変数・メソッド名を書く基本を学びます。',
      bookReference: 'リーダブルコード 第2章',
      code: `// Bad: 意味不明な名前
// int d; // 経過日数？距離？
// String s; // 何の文字列？

// Good: 意図が明確な命名
public class OrderSummary {

    private final int elapsedDays;
    private final double totalAmount;
    private final String customerName;
    private final boolean isPremiumMember;

    public OrderSummary(int elapsedDays, double totalAmount,
                        String customerName, boolean isPremiumMember) {
        this.elapsedDays = elapsedDays;
        this.totalAmount = totalAmount;
        this.customerName = customerName;
        this.isPremiumMember = isPremiumMember;
    }

    public double calculateDiscountedPrice() {
        double discountRate = isPremiumMember ? 0.15 : 0.05;
        return totalAmount * (1.0 - discountRate);
    }

    public boolean isExpiredOrder() {
        return elapsedDays > 30;
    }

    public String formatSummary() {
        return String.format(
            "%s 様 | 合計: ¥%.0f | 会員: %s",
            customerName, calculateDiscountedPrice(),
            isPremiumMember ? "プレミアム" : "一般"
        );
    }
}`,
      highlights: [
        { startLine: 8, endLine: 11, color: '#22c55e', label: '明確なフィールド名', explanation: '型と名前だけで意味がわかるフィールド。コメント不要。' },
        { startLine: 21, endLine: 24, color: '#3b82f6', label: '動詞+名詞のメソッド名', explanation: 'calculateDiscountedPrice — 何を計算するか一目瞭然。' },
        { startLine: 26, endLine: 28, color: '#f59e0b', label: 'is接頭辞のboolean', explanation: 'isExpiredOrder — 真偽値を返すメソッドには is/has/can を使う。' },
      ],
      keyPoints: [
        '変数名は「何を表すか」が一目でわかるように',
        'boolean は is/has/can 接頭辞を使う',
        'メソッド名は動詞から始める',
        '略語を避け、検索しやすい名前をつける',
      ],
    },
    {
      id: 2,
      title: 'Single Responsibility Methods',
      titleJa: '単一責任のメソッド',
      difficulty: 'beginner',
      category: 'Clean Code',
      description: '1つのメソッドは1つのことだけを行う原則。関数を小さく保つ技術を学びます。',
      bookReference: 'Clean Code 第3章',
      code: `public class UserRegistrationService {

    private final UserRepository userRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;

    public UserRegistrationService(UserRepository userRepository,
                                    EmailService emailService,
                                    PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.emailService = emailService;
        this.passwordEncoder = passwordEncoder;
    }

    // 各メソッドが「1つのこと」だけを行う
    public User register(String name, String email, String rawPassword) {
        validateInput(name, email, rawPassword);
        ensureEmailNotTaken(email);
        User user = createUser(name, email, rawPassword);
        userRepository.save(user);
        emailService.sendWelcome(user.getEmail(), user.getName());
        return user;
    }

    private void validateInput(String name, String email, String password) {
        if (name == null || name.isBlank()) {
            throw new IllegalArgumentException("名前は必須です");
        }
        if (email == null || !email.contains("@")) {
            throw new IllegalArgumentException("有効なメールアドレスを入力してください");
        }
        if (password == null || password.length() < 8) {
            throw new IllegalArgumentException("パスワードは8文字以上必要です");
        }
    }

    private void ensureEmailNotTaken(String email) {
        if (userRepository.existsByEmail(email)) {
            throw new IllegalStateException("このメールアドレスは既に使用されています");
        }
    }

    private User createUser(String name, String email, String rawPassword) {
        String encoded = passwordEncoder.encode(rawPassword);
        return new User(name, email, encoded);
    }
}`,
      highlights: [
        { startLine: 16, endLine: 23, color: '#22c55e', label: 'オーケストレーション', explanation: 'register() は各ステップを呼び出すだけ。処理の流れが一目瞭然。' },
        { startLine: 25, endLine: 35, color: '#ef4444', label: 'バリデーション専用', explanation: '入力検証だけを責務とする。他のことはしない。' },
        { startLine: 37, endLine: 41, color: '#3b82f6', label: '存在チェック専用', explanation: '重複確認の責務のみ。' },
        { startLine: 43, endLine: 46, color: '#f59e0b', label: 'オブジェクト生成専用', explanation: 'Userの生成ロジックを分離。' },
      ],
      keyPoints: [
        '1メソッド = 1つの責務',
        'public メソッドはオーケストレーション（手順の指揮）',
        'private メソッドで個々の処理を分離',
        'メソッドの行数は20行以下が目安',
      ],
    },
    {
      id: 3,
      title: 'Guard Clauses',
      titleJa: 'ガード節による早期リターン',
      difficulty: 'beginner',
      category: 'Clean Code',
      description: 'ネストを減らし可読性を上げるガード節パターンを学びます。',
      bookReference: 'リーダブルコード 第7章',
      code: `public class ShippingCalculator {

    private static final double BASE_RATE = 500.0;
    private static final double FREE_SHIPPING_THRESHOLD = 10000.0;
    private static final double HEAVY_SURCHARGE = 800.0;
    private static final double HEAVY_WEIGHT_KG = 20.0;

    // ガード節で異常系を先に排除
    public double calculate(Order order) {
        if (order == null) {
            throw new IllegalArgumentException("注文が null です");
        }

        if (order.getItems().isEmpty()) {
            return 0.0;
        }

        if (order.getTotalAmount() >= FREE_SHIPPING_THRESHOLD) {
            return 0.0;  // 送料無料
        }

        // ここに到達 = 通常の送料計算（ネストなし）
        double shipping = BASE_RATE;

        if (order.getTotalWeight() > HEAVY_WEIGHT_KG) {
            shipping += HEAVY_SURCHARGE;
        }

        if (order.isExpressDelivery()) {
            shipping *= 1.5;
        }

        return shipping;
    }

    // Bad: ネストが深い例（before）
    // public double calculateBad(Order order) {
    //     if (order != null) {
    //         if (!order.getItems().isEmpty()) {
    //             if (order.getTotalAmount() < 10000) {
    //                 double shipping = 500;
    //                 // ... さらにネスト ...
    //             }
    //         }
    //     }
    // }
}`,
      highlights: [
        { startLine: 10, endLine: 12, color: '#ef4444', label: 'null ガード', explanation: '最初に null チェック。異常系を即排除。' },
        { startLine: 14, endLine: 16, color: '#ef4444', label: '空リストガード', explanation: '空注文 → 即 return 0。' },
        { startLine: 18, endLine: 20, color: '#22c55e', label: '条件ガード', explanation: '送料無料条件を先にチェックして早期リターン。' },
        { startLine: 23, endLine: 33, color: '#3b82f6', label: 'フラットな本処理', explanation: 'ガード節の後はネストなしで本処理を書ける。' },
      ],
      keyPoints: [
        '異常系・特殊ケースを先に return で排除',
        'ネストの深さを減らし可読性を向上',
        '「正常パス」がメソッドの最後にフラットに残る',
        'if-else のネストを避ける最もシンプルな手法',
      ],
    },
    {
      id: 4,
      title: 'Constants and Enums',
      titleJa: '定数とEnum活用',
      difficulty: 'beginner',
      category: 'Clean Code',
      description: 'マジックナンバーを排除し、Enumで型安全な状態管理を実現します。',
      bookReference: 'Effective Java 第34項',
      code: `public enum OrderStatus {
    PENDING("保留中", true),
    CONFIRMED("確認済み", true),
    SHIPPED("発送済み", false),
    DELIVERED("配達完了", false),
    CANCELLED("キャンセル", false);

    private final String displayName;
    private final boolean cancellable;

    OrderStatus(String displayName, boolean cancellable) {
        this.displayName = displayName;
        this.cancellable = cancellable;
    }

    public String getDisplayName() {
        return displayName;
    }

    public boolean isCancellable() {
        return cancellable;
    }

    public OrderStatus next() {
        return switch (this) {
            case PENDING -> CONFIRMED;
            case CONFIRMED -> SHIPPED;
            case SHIPPED -> DELIVERED;
            default -> throw new IllegalStateException(
                this.displayName + " から次の状態へ遷移できません"
            );
        };
    }
}

// 使用例
// OrderStatus status = OrderStatus.PENDING;
// status.next();          // → CONFIRMED
// status.isCancellable(); // → true
// status.getDisplayName(); // → "保留中"`,
      highlights: [
        { startLine: 1, endLine: 6, color: '#f59e0b', label: 'Enum定義', explanation: '各定数にメタデータ（表示名、キャンセル可否）を持たせる。' },
        { startLine: 8, endLine: 14, color: '#3b82f6', label: 'フィールド+コンストラクタ', explanation: 'Enumの各値にデータを付与するJavaのパターン。' },
        { startLine: 24, endLine: 33, color: '#22c55e', label: '状態遷移ロジック', explanation: 'Enum自身に遷移ルールを持たせる。switch式でコンパクトに。' },
      ],
      keyPoints: [
        'マジックナンバーや文字列定数の代わりにEnumを使う',
        'Enumにメソッドやフィールドを持たせて振る舞いを集約',
        'switch式（Java 14+）でパターンマッチ',
        '不正な遷移はコンパイル時またはランタイムで検出',
      ],
    },
    {
      id: 5,
      title: 'Immutable Objects',
      titleJa: '不変オブジェクト',
      difficulty: 'beginner',
      category: 'Clean Code',
      description: 'record やfinal フィールドで不変オブジェクトを作り、安全なコードを書きます。',
      bookReference: 'Effective Java 第17項',
      code: `// Java 16+ record: 不変データの最もシンプルな表現
public record Money(long amount, String currency) {

    // コンパクトコンストラクタでバリデーション
    public Money {
        if (amount < 0) {
            throw new IllegalArgumentException("金額は0以上: " + amount);
        }
        if (currency == null || currency.isBlank()) {
            throw new IllegalArgumentException("通貨コードは必須");
        }
        currency = currency.toUpperCase();
    }

    public Money add(Money other) {
        requireSameCurrency(other);
        return new Money(this.amount + other.amount, this.currency);
    }

    public Money subtract(Money other) {
        requireSameCurrency(other);
        long result = this.amount - other.amount;
        if (result < 0) {
            throw new IllegalStateException("残高不足");
        }
        return new Money(result, this.currency);
    }

    public Money multiply(int factor) {
        return new Money(this.amount * factor, this.currency);
    }

    private void requireSameCurrency(Money other) {
        if (!this.currency.equals(other.currency)) {
            throw new IllegalArgumentException(
                "通貨が異なります: " + this.currency + " vs " + other.currency
            );
        }
    }
}

// 使い方
// Money price = new Money(1000, "jpy");
// Money tax = new Money(100, "jpy");
// Money total = price.add(tax); // 新しいインスタンスが返る
// // price は変更されない（不変）`,
      highlights: [
        { startLine: 2, endLine: 2, color: '#22c55e', label: 'record宣言', explanation: 'record は自動的に不変。equals/hashCode/toString も自動生成。' },
        { startLine: 5, endLine: 13, color: '#ef4444', label: 'コンパクトコンストラクタ', explanation: '生成時にバリデーション。不正な状態のオブジェクトは作れない。' },
        { startLine: 15, endLine: 18, color: '#3b82f6', label: '新インスタンス返却', explanation: '自身を変更せず、新しい Money を返す。関数型スタイル。' },
      ],
      keyPoints: [
        'record を使えば不変オブジェクトが最小コードで作れる',
        '全メソッドが副作用なし（新インスタンスを返す）',
        'コンパクトコンストラクタで不変条件を保証',
        'スレッドセーフ・予測可能・テストしやすい',
      ],
    },
    {
      id: 6,
      title: 'Optional Handling',
      titleJa: 'Optional の正しい使い方',
      difficulty: 'beginner',
      category: 'Clean Code',
      description: 'null を型安全に扱う Optional の正しいパターンと避けるべきアンチパターン。',
      bookReference: 'Effective Java 第55項',
      code: `import java.util.Optional;

public class UserService {

    private final UserRepository repository;

    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    // Good: Optional を返す
    public Optional<User> findByEmail(String email) {
        return repository.findByEmail(email);
    }

    // Good: map/orElse チェーン
    public String getUserDisplayName(String email) {
        return findByEmail(email)
            .map(User::getDisplayName)
            .orElse("ゲスト");
    }

    // Good: orElseThrow で明示的エラー
    public User getRequiredUser(String email) {
        return findByEmail(email)
            .orElseThrow(() -> new UserNotFoundException(
                "ユーザーが見つかりません: " + email
            ));
    }

    // Good: filter + map の組み合わせ
    public Optional<String> getActiveUserName(String email) {
        return findByEmail(email)
            .filter(User::isActive)
            .map(User::getName);
    }

    // Bad: これらは避ける
    // ❌ Optional.get() を直接呼ぶ
    // ❌ Optional をフィールドに持つ
    // ❌ Optional を引数に使う
    // ❌ Optional.of(null) を使う
}`,
      highlights: [
        { startLine: 12, endLine: 14, color: '#22c55e', label: 'Optional返却', explanation: '値がない可能性があることを型で表現。' },
        { startLine: 17, endLine: 21, color: '#3b82f6', label: 'map + orElse', explanation: '関数型チェーンで null チェック不要に。' },
        { startLine: 24, endLine: 29, color: '#ef4444', label: 'orElseThrow', explanation: '必須の場合は明示的な例外で失敗させる。' },
        { startLine: 32, endLine: 36, color: '#a855f7', label: 'filter + map', explanation: '条件フィルタリングも Optional チェーンで。' },
      ],
      keyPoints: [
        'Optional は「値がないかもしれない」を型で表現する',
        'map/flatMap/filter でチェーンし、null チェックを排除',
        'orElse/orElseThrow でデフォルト値や例外を明示',
        'フィールドや引数には Optional を使わない',
      ],
    },
    {
      id: 7,
      title: 'Exception Hierarchy',
      titleJa: '例外の階層設計',
      difficulty: 'beginner',
      category: 'Clean Code',
      description: 'ドメイン固有の例外クラスを設計し、適切なエラーハンドリングを実現します。',
      bookReference: 'Clean Code 第7章',
      code: `// ドメイン例外の基底クラス
public abstract class DomainException extends RuntimeException {
    private final String errorCode;

    protected DomainException(String errorCode, String message) {
        super(message);
        this.errorCode = errorCode;
    }

    public String getErrorCode() {
        return errorCode;
    }
}

// 具体的なドメイン例外
public class EntityNotFoundException extends DomainException {
    public EntityNotFoundException(String entityName, Object id) {
        super("NOT_FOUND",
            String.format("%s が見つかりません (ID: %s)", entityName, id));
    }
}

public class BusinessRuleViolation extends DomainException {
    public BusinessRuleViolation(String rule) {
        super("RULE_VIOLATION", "ビジネスルール違反: " + rule);
    }
}

public class DuplicateEntityException extends DomainException {
    public DuplicateEntityException(String entityName, String field, String value) {
        super("DUPLICATE",
            String.format("%s の %s '%s' は既に存在します", entityName, field, value));
    }
}

// 使用側
public class OrderService {
    public Order cancelOrder(long orderId) {
        Order order = orderRepository.findById(orderId)
            .orElseThrow(() ->
                new EntityNotFoundException("注文", orderId));

        if (!order.getStatus().isCancellable()) {
            throw new BusinessRuleViolation(
                "ステータス " + order.getStatus().getDisplayName()
                + " ではキャンセルできません"
            );
        }

        order.cancel();
        return orderRepository.save(order);
    }
}`,
      highlights: [
        { startLine: 2, endLine: 13, color: '#a855f7', label: '基底例外クラス', explanation: '全ドメイン例外の共通構造。errorCode でプログラム的にハンドリング可能。' },
        { startLine: 16, endLine: 21, color: '#ef4444', label: 'Not Found 例外', explanation: 'エンティティ名 + ID を含む明確なメッセージ。' },
        { startLine: 23, endLine: 27, color: '#ef4444', label: 'ビジネスルール違反', explanation: 'ドメインルールのバリデーション用。' },
        { startLine: 37, endLine: 53, color: '#22c55e', label: '例外の活用', explanation: '適切な例外を投げることで、呼び出し側が意味のあるハンドリングを行える。' },
      ],
      keyPoints: [
        'ドメイン固有の例外階層を設計する',
        '例外メッセージに十分なコンテキスト情報を含める',
        'errorCode でプログラマティックなハンドリングを可能に',
        '業務例外には RuntimeException を使うのが一般的',
      ],
    },
    {
      id: 8,
      title: 'Stream API Basics',
      titleJa: 'Stream API の基本',
      difficulty: 'beginner',
      category: 'Modern Java',
      description: 'コレクション処理を宣言的に書く Stream API の基本パターンを学びます。',
      code: `import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class OrderAnalyzer {

    // 宣言的なコレクション操作
    public double calculateTotalRevenue(List<Order> orders) {
        return orders.stream()
            .filter(order -> order.getStatus() == OrderStatus.DELIVERED)
            .mapToDouble(Order::getTotalAmount)
            .sum();
    }

    // グルーピング
    public Map<OrderStatus, List<Order>> groupByStatus(List<Order> orders) {
        return orders.stream()
            .collect(Collectors.groupingBy(Order::getStatus));
    }

    // 複合条件
    public List<String> getTopCustomerEmails(List<Order> orders,
                                              double minAmount) {
        return orders.stream()
            .filter(o -> o.getTotalAmount() >= minAmount)
            .filter(o -> o.getStatus() == OrderStatus.DELIVERED)
            .map(Order::getCustomerEmail)
            .distinct()
            .sorted()
            .toList();
    }

    // 集約
    public OrderSummary summarize(List<Order> orders) {
        var stats = orders.stream()
            .filter(o -> o.getStatus() == OrderStatus.DELIVERED)
            .mapToDouble(Order::getTotalAmount)
            .summaryStatistics();

        return new OrderSummary(
            stats.getCount(),
            stats.getSum(),
            stats.getAverage(),
            stats.getMax()
        );
    }
}`,
      highlights: [
        { startLine: 8, endLine: 13, color: '#22c55e', label: 'filter + map + sum', explanation: '基本のStream チェーン。フィルタ → 変換 → 集約。' },
        { startLine: 16, endLine: 19, color: '#3b82f6', label: 'groupingBy', explanation: 'Collectors.groupingBy で自動グルーピング。' },
        { startLine: 22, endLine: 31, color: '#a855f7', label: '複合チェーン', explanation: 'filter → map → distinct → sorted の組み合わせ。' },
        { startLine: 34, endLine: 46, color: '#f59e0b', label: 'summaryStatistics', explanation: '一度の走査でcount, sum, average, max を取得。' },
      ],
      keyPoints: [
        'for ループの代わりに Stream で宣言的に書く',
        'filter → map → collect の基本パイプライン',
        'Collectors の便利メソッドを活用',
        'summaryStatistics で複数の集計を一括取得',
      ],
    },
    {
      id: 9,
      title: 'Interface Segregation',
      titleJa: 'インターフェース分離の原則',
      difficulty: 'beginner',
      category: 'SOLID',
      description: 'クライアントが使わないメソッドに依存しないよう、インターフェースを分割します。',
      bookReference: 'Clean Architecture 第10章',
      code: `// Bad: 巨大なインターフェース
// interface Worker {
//     void code();
//     void test();
//     void deploy();
//     void manageTeam();
//     void reviewCode();
// }

// Good: 役割ごとに分離
public interface Coder {
    void writeCode(String task);
    void fixBug(String bugId);
}

public interface Tester {
    void runTests();
    TestReport generateReport();
}

public interface Deployer {
    void deploy(String environment);
    void rollback(String version);
}

public interface TeamLead extends Coder {
    void reviewCode(String pullRequestId);
    void assignTask(String task, String assignee);
}

// 実装クラスは必要なインターフェースだけ実装
public class JuniorDeveloper implements Coder {
    @Override
    public void writeCode(String task) {
        System.out.println("コーディング: " + task);
    }

    @Override
    public void fixBug(String bugId) {
        System.out.println("バグ修正: " + bugId);
    }
}

public class SeniorDeveloper implements Coder, Tester, Deployer {
    @Override
    public void writeCode(String task) {
        System.out.println("設計 + コーディング: " + task);
    }

    @Override
    public void fixBug(String bugId) {
        System.out.println("根本原因分析 + 修正: " + bugId);
    }

    @Override
    public void runTests() {
        System.out.println("結合テスト実行");
    }

    @Override
    public TestReport generateReport() {
        return new TestReport("PASS", 42);
    }

    @Override
    public void deploy(String environment) {
        System.out.println(environment + " へデプロイ");
    }

    @Override
    public void rollback(String version) {
        System.out.println("v" + version + " へロールバック");
    }
}`,
      highlights: [
        { startLine: 11, endLine: 14, color: '#a855f7', label: 'Coder IF', explanation: 'コーディングに関する操作のみ。' },
        { startLine: 16, endLine: 19, color: '#a855f7', label: 'Tester IF', explanation: 'テストに関する操作のみ。' },
        { startLine: 21, endLine: 24, color: '#a855f7', label: 'Deployer IF', explanation: 'デプロイに関する操作のみ。' },
        { startLine: 32, endLine: 42, color: '#22c55e', label: '最小実装', explanation: 'JuniorDeveloper は Coder のみ実装。不要な deploy() などに依存しない。' },
        { startLine: 44, endLine: 74, color: '#3b82f6', label: '複数IF実装', explanation: 'SeniorDeveloper は必要な全インターフェースを実装。' },
      ],
      keyPoints: [
        'クライアントに不要なメソッドを強制しない',
        '役割ごとにインターフェースを分ける',
        'extends で IF を合成できる',
        '小さい IF は再利用性が高い',
      ],
    },
    {
      id: 10,
      title: 'Builder Pattern Basics',
      titleJa: 'ビルダーパターン基礎',
      difficulty: 'beginner',
      category: 'Design Patterns',
      description: '多数のパラメータを持つオブジェクトを読みやすく構築するパターンです。',
      bookReference: 'Effective Java 第2項',
      code: `public class HttpRequest {

    private final String method;
    private final String url;
    private final Map<String, String> headers;
    private final String body;
    private final int timeoutMs;
    private final boolean followRedirects;

    private HttpRequest(Builder builder) {
        this.method = builder.method;
        this.url = builder.url;
        this.headers = Map.copyOf(builder.headers);
        this.body = builder.body;
        this.timeoutMs = builder.timeoutMs;
        this.followRedirects = builder.followRedirects;
    }

    // Getters省略

    public static class Builder {
        // 必須パラメータ
        private final String method;
        private final String url;

        // オプションパラメータ（デフォルト値付き）
        private Map<String, String> headers = new HashMap<>();
        private String body = null;
        private int timeoutMs = 30000;
        private boolean followRedirects = true;

        public Builder(String method, String url) {
            this.method = method;
            this.url = url;
        }

        public Builder header(String key, String value) {
            this.headers.put(key, value);
            return this;
        }

        public Builder body(String body) {
            this.body = body;
            return this;
        }

        public Builder timeout(int ms) {
            this.timeoutMs = ms;
            return this;
        }

        public Builder followRedirects(boolean follow) {
            this.followRedirects = follow;
            return this;
        }

        public HttpRequest build() {
            return new HttpRequest(this);
        }
    }
}

// 使い方: 読みやすいフルーエントAPI
// HttpRequest req = new HttpRequest.Builder("POST", "/api/users")
//     .header("Content-Type", "application/json")
//     .header("Authorization", "Bearer token")
//     .body("{ \\"name\\": \\"Taro\\" }")
//     .timeout(5000)
//     .build();`,
      highlights: [
        { startLine: 3, endLine: 8, color: '#f59e0b', label: '不変フィールド', explanation: 'final で不変。Builderからのみ設定される。' },
        { startLine: 10, endLine: 17, color: '#22c55e', label: 'プライベートコンストラクタ', explanation: 'Builderからのみ生成可能。不正な状態を防止。' },
        { startLine: 21, endLine: 60, color: '#3b82f6', label: 'Builder内部クラス', explanation: '必須/オプションを分け、メソッドチェーンで構築。' },
        { startLine: 57, endLine: 59, color: '#ec4899', label: 'buildメソッド', explanation: '最後に build() で不変オブジェクトを生成。' },
      ],
      keyPoints: [
        'コンストラクタの引数が多い場合にBuilderが有効',
        '必須パラメータはBuilderのコンストラクタで、オプションはメソッドで',
        'メソッドチェーンで可読性が高い',
        'build() で不変オブジェクトを生成',
      ],
    },
    {
      id: 11,
      title: 'Sealed Classes',
      titleJa: 'sealed クラスで型安全な階層',
      difficulty: 'beginner',
      category: 'Modern Java',
      description: 'Java 17+ の sealed クラスで閉じた型階層を定義し、パターンマッチングを活用します。',
      code: `// Java 17: sealed で継承を制限
public sealed interface Shape
    permits Circle, Rectangle, Triangle {

    double area();
}

public record Circle(double radius) implements Shape {
    @Override
    public double area() {
        return Math.PI * radius * radius;
    }
}

public record Rectangle(double width, double height) implements Shape {
    @Override
    public double area() {
        return width * height;
    }
}

public record Triangle(double base, double height) implements Shape {
    @Override
    public double area() {
        return 0.5 * base * height;
    }
}

// Java 21: パターンマッチングで安全に分岐
public class ShapeRenderer {
    public String describe(Shape shape) {
        return switch (shape) {
            case Circle c ->
                String.format("半径 %.1f の円 (面積: %.2f)", c.radius(), c.area());
            case Rectangle r ->
                String.format("%.1f x %.1f の長方形 (面積: %.2f)",
                    r.width(), r.height(), r.area());
            case Triangle t ->
                String.format("底辺 %.1f 高さ %.1f の三角形 (面積: %.2f)",
                    t.base(), t.height(), t.area());
            // コンパイラが網羅性を検証 → default 不要
        };
    }
}`,
      highlights: [
        { startLine: 2, endLine: 6, color: '#a855f7', label: 'sealed interface', explanation: 'permits で許可する実装を列挙。それ以外は実装不可。' },
        { startLine: 8, endLine: 13, color: '#f59e0b', label: 'record実装', explanation: 'record + implements で簡潔なデータ+振る舞い。' },
        { startLine: 31, endLine: 43, color: '#22c55e', label: 'パターンマッチング', explanation: 'sealed + switch式でコンパイラが網羅性を検証。漏れがあればエラー。' },
      ],
      keyPoints: [
        'sealed で型階層を閉じ、許可された型のみ実装可能',
        'record と組み合わせてデータクラスを簡潔に定義',
        'switch式のパターンマッチングでコンパイル時に網羅性を検証',
        'default 句が不要になり、新しい型追加時にコンパイルエラーで検出',
      ],
    },

    // ===== INTERMEDIATE (id 12-22) =====
    {
      id: 12,
      title: 'Strategy Pattern',
      titleJa: 'ストラテジーパターン',
      difficulty: 'intermediate',
      category: 'Design Patterns',
      description: 'アルゴリズムをオブジェクトとしてカプセル化し、実行時に切り替え可能にするパターンです。',
      bookReference: 'GoFデザインパターン',
      code: `// 戦略インターフェース
@FunctionalInterface
public interface PricingStrategy {
    Money calculatePrice(Order order);
}

// 具象戦略1: 通常価格
public class RegularPricing implements PricingStrategy {
    @Override
    public Money calculatePrice(Order order) {
        return order.getSubtotal();
    }
}

// 具象戦略2: 会員割引
public class MemberPricing implements PricingStrategy {
    private final double discountRate;

    public MemberPricing(double discountRate) {
        this.discountRate = discountRate;
    }

    @Override
    public Money calculatePrice(Order order) {
        Money subtotal = order.getSubtotal();
        long discounted = Math.round(subtotal.amount() * (1.0 - discountRate));
        return new Money(discounted, subtotal.currency());
    }
}

// 具象戦略3: 数量割引
public class BulkPricing implements PricingStrategy {
    private final int threshold;
    private final double bulkDiscount;

    public BulkPricing(int threshold, double bulkDiscount) {
        this.threshold = threshold;
        this.bulkDiscount = bulkDiscount;
    }

    @Override
    public Money calculatePrice(Order order) {
        Money subtotal = order.getSubtotal();
        if (order.getTotalQuantity() >= threshold) {
            long discounted = Math.round(subtotal.amount() * (1.0 - bulkDiscount));
            return new Money(discounted, subtotal.currency());
        }
        return subtotal;
    }
}

// コンテキスト: 戦略を利用する側
public class CheckoutService {
    private final PricingStrategy pricingStrategy;

    public CheckoutService(PricingStrategy pricingStrategy) {
        this.pricingStrategy = pricingStrategy;
    }

    public Invoice checkout(Order order) {
        Money finalPrice = pricingStrategy.calculatePrice(order);
        Money tax = calculateTax(finalPrice);
        return new Invoice(order.getId(), finalPrice, tax);
    }

    private Money calculateTax(Money price) {
        long taxAmount = Math.round(price.amount() * 0.10);
        return new Money(taxAmount, price.currency());
    }
}

// ファクトリで戦略を選択
public class PricingStrategyFactory {
    public static PricingStrategy create(Customer customer) {
        if (customer.isPremium()) {
            return new MemberPricing(0.20);
        }
        if (customer.isMember()) {
            return new MemberPricing(0.10);
        }
        return new RegularPricing();
    }
}`,
      highlights: [
        { startLine: 2, endLine: 5, color: '#a855f7', label: '戦略インターフェース', explanation: '@FunctionalInterface で単一メソッド。ラムダでも使える。' },
        { startLine: 8, endLine: 13, color: '#3b82f6', label: '通常価格戦略', explanation: '最もシンプルな実装。' },
        { startLine: 16, endLine: 29, color: '#3b82f6', label: '会員割引戦略', explanation: '割引率をコンストラクタで注入。' },
        { startLine: 52, endLine: 70, color: '#22c55e', label: 'コンテキスト', explanation: 'CheckoutService は戦略に依存するが、具象クラスを知らない。' },
        { startLine: 72, endLine: 83, color: '#ec4899', label: '戦略ファクトリ', explanation: '顧客の属性に基づいて適切な戦略を生成。' },
      ],
      keyPoints: [
        'アルゴリズムをインターフェースで抽象化',
        'コンテキストは具象戦略を知らない（疎結合）',
        '@FunctionalInterface でラムダ式でも渡せる',
        'ファクトリパターンと組み合わせて戦略の選択を分離',
      ],
    },
    {
      id: 13,
      title: 'Observer Pattern',
      titleJa: 'オブザーバーパターン',
      difficulty: 'intermediate',
      category: 'Design Patterns',
      description: 'オブジェクト間のイベント通知を疎結合に実現するパターンです。',
      bookReference: 'GoFデザインパターン',
      code: `import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

// イベントデータ
public record OrderEvent(
    String type,
    Order order,
    java.time.Instant timestamp
) {
    public static OrderEvent created(Order order) {
        return new OrderEvent("CREATED", order, java.time.Instant.now());
    }

    public static OrderEvent cancelled(Order order) {
        return new OrderEvent("CANCELLED", order, java.time.Instant.now());
    }
}

// オブザーバーインターフェース
@FunctionalInterface
public interface OrderEventListener {
    void onEvent(OrderEvent event);
}

// Subject (イベント発行者)
public class OrderService {
    private final List<OrderEventListener> listeners =
        new CopyOnWriteArrayList<>();
    private final OrderRepository repository;

    public OrderService(OrderRepository repository) {
        this.repository = repository;
    }

    public void addListener(OrderEventListener listener) {
        listeners.add(listener);
    }

    public void removeListener(OrderEventListener listener) {
        listeners.remove(listener);
    }

    public Order createOrder(OrderRequest request) {
        Order order = new Order(request);
        repository.save(order);
        notifyAll(OrderEvent.created(order));
        return order;
    }

    public void cancelOrder(long orderId) {
        Order order = repository.findById(orderId)
            .orElseThrow(() -> new EntityNotFoundException("注文", orderId));
        order.cancel();
        repository.save(order);
        notifyAll(OrderEvent.cancelled(order));
    }

    private void notifyAll(OrderEvent event) {
        listeners.forEach(listener -> listener.onEvent(event));
    }
}

// 具象オブザーバーたち
public class EmailNotifier implements OrderEventListener {
    @Override
    public void onEvent(OrderEvent event) {
        if ("CREATED".equals(event.type())) {
            System.out.println("確認メール送信 → " + event.order().getEmail());
        }
    }
}

public class InventoryManager implements OrderEventListener {
    @Override
    public void onEvent(OrderEvent event) {
        switch (event.type()) {
            case "CREATED" -> reserveStock(event.order());
            case "CANCELLED" -> releaseStock(event.order());
        }
    }

    private void reserveStock(Order order) {
        System.out.println("在庫確保: " + order.getItems().size() + " 品目");
    }

    private void releaseStock(Order order) {
        System.out.println("在庫解放: " + order.getItems().size() + " 品目");
    }
}

public class AuditLogger implements OrderEventListener {
    @Override
    public void onEvent(OrderEvent event) {
        System.out.printf("[AUDIT] %s | %s | 注文#%d%n",
            event.timestamp(), event.type(), event.order().getId());
    }
}`,
      highlights: [
        { startLine: 5, endLine: 17, color: '#f59e0b', label: 'イベントデータ', explanation: 'record でイベントを不変データとして定義。ファクトリメソッドで生成。' },
        { startLine: 20, endLine: 23, color: '#a855f7', label: 'リスナーIF', explanation: '@FunctionalInterface で柔軟に。ラムダでもクラスでもOK。' },
        { startLine: 26, endLine: 61, color: '#22c55e', label: 'Subject', explanation: 'OrderService がリスナーの登録・通知を管理。ドメインロジックとは分離。' },
        { startLine: 63, endLine: 71, color: '#3b82f6', label: 'メール通知', explanation: '注文作成時にメール送信。' },
        { startLine: 73, endLine: 89, color: '#3b82f6', label: '在庫管理', explanation: 'イベントに応じて在庫を確保/解放。' },
      ],
      keyPoints: [
        'Subject と Observer が疎結合',
        'CopyOnWriteArrayList でスレッドセーフ',
        '@FunctionalInterface でラムダも受付可能',
        'record でイベントデータを不変に',
      ],
    },
    {
      id: 14,
      title: 'Repository Pattern',
      titleJa: 'リポジトリパターン',
      difficulty: 'intermediate',
      category: 'Architecture',
      description: 'データアクセスを抽象化し、ドメイン層を永続化技術から独立させます。',
      bookReference: 'PofEAA',
      code: `import java.util.Optional;
import java.util.List;

// リポジトリインターフェース（ドメイン層）
public interface UserRepository {
    Optional<User> findById(long id);
    Optional<User> findByEmail(String email);
    List<User> findByStatus(UserStatus status);
    User save(User user);
    void deleteById(long id);
    boolean existsByEmail(String email);
}

// 仕様パターン: 複雑な検索条件をオブジェクト化
public interface Specification<T> {
    boolean isSatisfiedBy(T entity);
}

public class ActivePremiumSpec implements Specification<User> {
    @Override
    public boolean isSatisfiedBy(User user) {
        return user.isActive() && user.isPremium();
    }
}

// インメモリ実装（テスト用）
public class InMemoryUserRepository implements UserRepository {
    private final Map<Long, User> store = new ConcurrentHashMap<>();
    private final AtomicLong idGenerator = new AtomicLong(1);

    @Override
    public Optional<User> findById(long id) {
        return Optional.ofNullable(store.get(id));
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return store.values().stream()
            .filter(u -> u.getEmail().equals(email))
            .findFirst();
    }

    @Override
    public List<User> findByStatus(UserStatus status) {
        return store.values().stream()
            .filter(u -> u.getStatus() == status)
            .toList();
    }

    @Override
    public User save(User user) {
        if (user.getId() == 0) {
            user = user.withId(idGenerator.getAndIncrement());
        }
        store.put(user.getId(), user);
        return user;
    }

    @Override
    public void deleteById(long id) {
        store.remove(id);
    }

    @Override
    public boolean existsByEmail(String email) {
        return store.values().stream()
            .anyMatch(u -> u.getEmail().equals(email));
    }

    // 仕様パターンで検索
    public List<User> findBy(Specification<User> spec) {
        return store.values().stream()
            .filter(spec::isSatisfiedBy)
            .toList();
    }
}`,
      highlights: [
        { startLine: 4, endLine: 12, color: '#a855f7', label: 'リポジトリIF', explanation: 'ドメイン層に属するインターフェース。永続化技術に依存しない。' },
        { startLine: 15, endLine: 24, color: '#f59e0b', label: '仕様パターン', explanation: '検索条件をオブジェクトとしてカプセル化。' },
        { startLine: 27, endLine: 76, color: '#22c55e', label: 'インメモリ実装', explanation: 'テスト用の実装。本番では JPA 等に差し替える。' },
        { startLine: 51, endLine: 57, color: '#3b82f6', label: 'save の ID 自動採番', explanation: '新規の場合は ID を自動発番してから保存。' },
      ],
      keyPoints: [
        'インターフェースはドメイン層、実装はインフラ層',
        'テスト時はインメモリ実装に差し替え可能',
        'Specification パターンで検索条件をオブジェクト化',
        'ドメインロジックが DB 技術に依存しない',
      ],
    },
    {
      id: 15,
      title: 'Command Pattern',
      titleJa: 'コマンドパターン',
      difficulty: 'intermediate',
      category: 'Design Patterns',
      description: '操作をオブジェクトとしてカプセル化し、undo/redo・キュー・ログを可能にします。',
      bookReference: 'GoFデザインパターン',
      code: `// コマンドインターフェース
public interface Command {
    void execute();
    void undo();
    String description();
}

// 具象コマンド: テキスト挿入
public class InsertTextCommand implements Command {
    private final TextDocument document;
    private final int position;
    private final String text;

    public InsertTextCommand(TextDocument document, int position, String text) {
        this.document = document;
        this.position = position;
        this.text = text;
    }

    @Override
    public void execute() {
        document.insertAt(position, text);
    }

    @Override
    public void undo() {
        document.deleteRange(position, position + text.length());
    }

    @Override
    public String description() {
        return String.format("テキスト挿入: '%s' (位置 %d)", text, position);
    }
}

// 具象コマンド: テキスト削除
public class DeleteTextCommand implements Command {
    private final TextDocument document;
    private final int start;
    private final int end;
    private String deletedText;

    public DeleteTextCommand(TextDocument document, int start, int end) {
        this.document = document;
        this.start = start;
        this.end = end;
    }

    @Override
    public void execute() {
        deletedText = document.getRange(start, end);
        document.deleteRange(start, end);
    }

    @Override
    public void undo() {
        document.insertAt(start, deletedText);
    }

    @Override
    public String description() {
        return String.format("テキスト削除: '%s' (位置 %d-%d)", deletedText, start, end);
    }
}

// Invoker: コマンド履歴管理
public class CommandHistory {
    private final Deque<Command> undoStack = new ArrayDeque<>();
    private final Deque<Command> redoStack = new ArrayDeque<>();

    public void execute(Command command) {
        command.execute();
        undoStack.push(command);
        redoStack.clear();
    }

    public void undo() {
        if (undoStack.isEmpty()) return;
        Command cmd = undoStack.pop();
        cmd.undo();
        redoStack.push(cmd);
    }

    public void redo() {
        if (redoStack.isEmpty()) return;
        Command cmd = redoStack.pop();
        cmd.execute();
        undoStack.push(cmd);
    }

    public List<String> getHistory() {
        return undoStack.stream()
            .map(Command::description)
            .toList();
    }
}`,
      highlights: [
        { startLine: 2, endLine: 6, color: '#a855f7', label: 'Command IF', explanation: 'execute + undo で操作の実行と取り消しを定義。' },
        { startLine: 9, endLine: 34, color: '#3b82f6', label: '挿入コマンド', explanation: '挿入位置とテキストを保持。undo で削除。' },
        { startLine: 37, endLine: 64, color: '#3b82f6', label: '削除コマンド', explanation: '削除前のテキストを保存。undo で再挿入。' },
        { startLine: 66, endLine: 96, color: '#22c55e', label: '履歴管理', explanation: 'undo/redo スタックでコマンド履歴を管理。' },
      ],
      keyPoints: [
        '操作をオブジェクトに变え、undo/redo を実現',
        'execute() と undo() で可逆的な操作',
        'Deque で undo/redo スタックを管理',
        'コマンドをキュー・ログ・リプレイにも応用可能',
      ],
    },
    {
      id: 16,
      title: 'Template Method Pattern',
      titleJa: 'テンプレートメソッドパターン',
      difficulty: 'intermediate',
      category: 'Design Patterns',
      description: 'アルゴリズムの骨格を基底クラスで定義し、各ステップをサブクラスで実装します。',
      bookReference: 'GoFデザインパターン',
      code: `// 抽象基底: データエクスポートのアルゴリズム骨格
public abstract class DataExporter<T> {

    // テンプレートメソッド: 処理の流れを定義（final）
    public final ExportResult export(ExportRequest request) {
        List<T> data = fetchData(request);

        if (data.isEmpty()) {
            return ExportResult.empty();
        }

        List<T> filtered = filterData(data, request);
        List<T> sorted = sortData(filtered);
        String content = formatData(sorted);
        String filename = generateFilename(request);

        return new ExportResult(filename, content, sorted.size());
    }

    // 抽象メソッド: サブクラスが実装
    protected abstract List<T> fetchData(ExportRequest request);
    protected abstract String formatData(List<T> data);

    // フックメソッド: デフォルト実装あり。必要に応じてオーバーライド
    protected List<T> filterData(List<T> data, ExportRequest request) {
        return data; // デフォルトはフィルタなし
    }

    protected List<T> sortData(List<T> data) {
        return data; // デフォルトはソートなし
    }

    protected String generateFilename(ExportRequest request) {
        return "export_" + java.time.LocalDate.now() + getFileExtension();
    }

    protected abstract String getFileExtension();
}

// 具象: CSV エクスポーター
public class CsvOrderExporter extends DataExporter<Order> {

    private final OrderRepository repository;

    public CsvOrderExporter(OrderRepository repository) {
        this.repository = repository;
    }

    @Override
    protected List<Order> fetchData(ExportRequest request) {
        return repository.findByDateRange(request.getFrom(), request.getTo());
    }

    @Override
    protected List<Order> sortData(List<Order> data) {
        return data.stream()
            .sorted(Comparator.comparing(Order::getCreatedAt))
            .toList();
    }

    @Override
    protected String formatData(List<Order> data) {
        StringBuilder sb = new StringBuilder();
        sb.append("注文ID,顧客名,金額,ステータス,日時\\n");
        for (Order o : data) {
            sb.append(String.format("%d,%s,%.0f,%s,%s\\n",
                o.getId(), o.getCustomerName(),
                o.getTotalAmount(), o.getStatus(),
                o.getCreatedAt()));
        }
        return sb.toString();
    }

    @Override
    protected String getFileExtension() {
        return ".csv";
    }
}

// 具象: JSON エクスポーター
public class JsonOrderExporter extends DataExporter<Order> {

    private final OrderRepository repository;
    private final ObjectMapper mapper = new ObjectMapper();

    public JsonOrderExporter(OrderRepository repository) {
        this.repository = repository;
    }

    @Override
    protected List<Order> fetchData(ExportRequest request) {
        return repository.findByDateRange(request.getFrom(), request.getTo());
    }

    @Override
    protected String formatData(List<Order> data) {
        try {
            return mapper.writerWithDefaultPrettyPrinter()
                .writeValueAsString(data);
        } catch (Exception e) {
            throw new ExportException("JSON 変換に失敗", e);
        }
    }

    @Override
    protected String getFileExtension() {
        return ".json";
    }
}`,
      highlights: [
        { startLine: 5, endLine: 18, color: '#22c55e', label: 'テンプレートメソッド', explanation: 'final で処理の流れを固定。各ステップを順に呼び出す。' },
        { startLine: 20, endLine: 22, color: '#a855f7', label: '抽象メソッド', explanation: 'サブクラスが必ず実装する。' },
        { startLine: 25, endLine: 31, color: '#3b82f6', label: 'フックメソッド', explanation: 'デフォルト実装あり。必要な場合のみオーバーライド。' },
        { startLine: 40, endLine: 78, color: '#f59e0b', label: 'CSV実装', explanation: 'fetch + sort + format を CSV 用に実装。' },
      ],
      keyPoints: [
        'テンプレートメソッドは final で骨格を固定',
        '抽象メソッドはサブクラスに実装を強制',
        'フックメソッドはデフォルト動作を持ちオーバーライド可能',
        'DRY原則: 共通の流れを基底クラスに集約',
      ],
    },
    {
      id: 17,
      title: 'Dependency Injection',
      titleJa: '依存性注入の原則',
      difficulty: 'intermediate',
      category: 'Architecture',
      description: '依存オブジェクトを外部から注入し、テスタブルで疎結合なコードを実現します。',
      bookReference: 'Clean Architecture 第11章',
      code: `// 通知サービスのインターフェース
public interface NotificationSender {
    void send(String to, String subject, String body);
    boolean supports(NotificationType type);
}

// 実装1: メール
public class EmailSender implements NotificationSender {
    private final SmtpClient smtpClient;

    public EmailSender(SmtpClient smtpClient) {
        this.smtpClient = smtpClient;
    }

    @Override
    public void send(String to, String subject, String body) {
        smtpClient.sendMail(to, subject, body);
    }

    @Override
    public boolean supports(NotificationType type) {
        return type == NotificationType.EMAIL;
    }
}

// 実装2: Slack
public class SlackSender implements NotificationSender {
    private final SlackWebhookClient webhook;

    public SlackSender(SlackWebhookClient webhook) {
        this.webhook = webhook;
    }

    @Override
    public void send(String to, String subject, String body) {
        webhook.postMessage(to, subject + "\\n" + body);
    }

    @Override
    public boolean supports(NotificationType type) {
        return type == NotificationType.SLACK;
    }
}

// DI を活用するサービス
public class AlertService {
    private final List<NotificationSender> senders;
    private final AlertRepository alertRepository;

    // コンストラクタで依存を注入
    public AlertService(List<NotificationSender> senders,
                        AlertRepository alertRepository) {
        this.senders = senders;
        this.alertRepository = alertRepository;
    }

    public void alert(Alert alert) {
        alertRepository.save(alert);

        for (NotificationSender sender : senders) {
            if (sender.supports(alert.getType())) {
                sender.send(
                    alert.getRecipient(),
                    alert.getTitle(),
                    alert.getMessage()
                );
            }
        }
    }
}

// テスト: モックを注入
// class AlertServiceTest {
//     @Test
//     void shouldSendEmailAlert() {
//         var mockSender = new FakeEmailSender();
//         var mockRepo = new InMemoryAlertRepository();
//         var service = new AlertService(List.of(mockSender), mockRepo);
//
//         service.alert(new Alert(...));
//
//         assertTrue(mockSender.wasCalled());
//     }
// }`,
      highlights: [
        { startLine: 2, endLine: 5, color: '#a855f7', label: '通知IF', explanation: '具象実装に依存しないインターフェース。' },
        { startLine: 8, endLine: 24, color: '#3b82f6', label: 'メール実装', explanation: 'SmtpClient を DI で受け取る。' },
        { startLine: 45, endLine: 70, color: '#22c55e', label: 'DI活用サービス', explanation: 'List<NotificationSender> をコンストラクタで注入。具象を知らない。' },
        { startLine: 72, endLine: 84, color: '#ec4899', label: 'テスト例', explanation: 'Fake/Mock を注入してユニットテスト。外部依存なし。' },
      ],
      keyPoints: [
        '依存はコンストラクタで注入する',
        'インターフェースに依存し、具象クラスに依存しない',
        'テスト時はモック/フェイクに差し替え可能',
        'Open-Closed原則: 新しい通知手段の追加が容易',
      ],
    },
    {
      id: 18,
      title: 'Decorator Pattern',
      titleJa: 'デコレータパターン',
      difficulty: 'intermediate',
      category: 'Design Patterns',
      description: '既存オブジェクトに責務を動的に追加する。継承を使わない拡張手法です。',
      bookReference: 'GoFデザインパターン',
      code: `// 基本インターフェース
public interface Logger {
    void log(String level, String message);
}

// 基本実装
public class ConsoleLogger implements Logger {
    @Override
    public void log(String level, String message) {
        System.out.printf("[%s] %s%n", level, message);
    }
}

// デコレータ基底
public abstract class LoggerDecorator implements Logger {
    protected final Logger wrapped;

    protected LoggerDecorator(Logger wrapped) {
        this.wrapped = wrapped;
    }
}

// デコレータ1: タイムスタンプ追加
public class TimestampLogger extends LoggerDecorator {
    public TimestampLogger(Logger wrapped) {
        super(wrapped);
    }

    @Override
    public void log(String level, String message) {
        String timestamped = java.time.LocalDateTime.now() + " | " + message;
        wrapped.log(level, timestamped);
    }
}

// デコレータ2: ファイル出力追加
public class FileLogger extends LoggerDecorator {
    private final String logFile;

    public FileLogger(Logger wrapped, String logFile) {
        super(wrapped);
        this.logFile = logFile;
    }

    @Override
    public void log(String level, String message) {
        wrapped.log(level, message);
        appendToFile(level, message);
    }

    private void appendToFile(String level, String message) {
        try {
            java.nio.file.Files.writeString(
                java.nio.file.Path.of(logFile),
                String.format("[%s] %s%n", level, message),
                java.nio.file.StandardOpenOption.CREATE,
                java.nio.file.StandardOpenOption.APPEND
            );
        } catch (Exception e) {
            System.err.println("ファイル書き込みエラー: " + e.getMessage());
        }
    }
}

// デコレータ3: レベルフィルタ
public class FilteredLogger extends LoggerDecorator {
    private final Set<String> allowedLevels;

    public FilteredLogger(Logger wrapped, String... levels) {
        super(wrapped);
        this.allowedLevels = Set.of(levels);
    }

    @Override
    public void log(String level, String message) {
        if (allowedLevels.contains(level)) {
            wrapped.log(level, message);
        }
    }
}

// 組み合わせ（使い方）
// Logger logger = new FilteredLogger(
//     new TimestampLogger(
//         new FileLogger(
//             new ConsoleLogger(),
//             "app.log"
//         )
//     ),
//     "ERROR", "WARN"
// );
// logger.log("ERROR", "ディスク容量不足");
// → フィルタOK → タイムスタンプ追加 → ファイル書込 + コンソール出力`,
      highlights: [
        { startLine: 2, endLine: 4, color: '#a855f7', label: '基本IF', explanation: '全てのLoggerが実装するインターフェース。' },
        { startLine: 15, endLine: 21, color: '#22c55e', label: 'デコレータ基底', explanation: 'wrapped フィールドで次のLoggerを保持。' },
        { startLine: 24, endLine: 34, color: '#3b82f6', label: 'タイムスタンプ', explanation: 'メッセージにタイムスタンプを付与してから委譲。' },
        { startLine: 37, endLine: 63, color: '#3b82f6', label: 'ファイル出力', explanation: 'コンソール出力に加えてファイルにも書く。' },
        { startLine: 82, endLine: 93, color: '#ec4899', label: '組み合わせ例', explanation: 'ネストして機能を重ね掛け。実行時に柔軟に組み合わせ。' },
      ],
      keyPoints: [
        '継承ではなく委譲で機能を動的に追加',
        'デコレータは同じインターフェースを実装',
        'ネストして複数のデコレータを組み合わせ可能',
        'Open-Closed原則: 元のクラスを変えずに機能追加',
      ],
    },
    {
      id: 19,
      title: 'Factory Method Pattern',
      titleJa: 'ファクトリーメソッド',
      difficulty: 'intermediate',
      category: 'Design Patterns',
      description: 'オブジェクト生成をサブクラスに委譲し、生成ロジックの変更に柔軟に対応します。',
      bookReference: 'GoFデザインパターン',
      code: `// 抽象プロダクト
public sealed interface Notification
    permits EmailNotification, SmsNotification, PushNotification {
    String getRecipient();
    String getContent();
    void send();
}

// 具象プロダクト
public record EmailNotification(String to, String subject, String body)
    implements Notification {

    @Override public String getRecipient() { return to; }
    @Override public String getContent() { return subject + ": " + body; }
    @Override public void send() {
        System.out.printf("📧 メール送信 → %s [%s]%n", to, subject);
    }
}

public record SmsNotification(String phoneNumber, String message)
    implements Notification {

    @Override public String getRecipient() { return phoneNumber; }
    @Override public String getContent() { return message; }
    @Override public void send() {
        System.out.printf("📱 SMS送信 → %s%n", phoneNumber);
    }
}

public record PushNotification(String deviceToken, String title, String body)
    implements Notification {

    @Override public String getRecipient() { return deviceToken; }
    @Override public String getContent() { return title + ": " + body; }
    @Override public void send() {
        System.out.printf("🔔 Push通知 → %s [%s]%n", deviceToken, title);
    }
}

// ファクトリ: 設定に基づいてNotification を生成
public class NotificationFactory {

    public static Notification create(NotificationConfig config, String message) {
        return switch (config.getType()) {
            case EMAIL -> new EmailNotification(
                config.getAddress(), "通知", message
            );
            case SMS -> new SmsNotification(
                config.getAddress(), message
            );
            case PUSH -> new PushNotification(
                config.getAddress(), "通知", message
            );
        };
    }
}

// 利用側: ファクトリに依存（具象クラスに依存しない）
public class NotificationService {
    private final NotificationFactory factory;

    public void notifyUser(User user, String message) {
        for (NotificationConfig config : user.getNotificationConfigs()) {
            Notification notification =
                NotificationFactory.create(config, message);
            notification.send();
        }
    }
}`,
      highlights: [
        { startLine: 2, endLine: 7, color: '#a855f7', label: 'sealed Notification', explanation: 'sealed で型を限定。ファクトリが全パターンを網羅していることを保証。' },
        { startLine: 10, endLine: 38, color: '#f59e0b', label: '具象プロダクト', explanation: 'record で不変データとして定義。send() で送信。' },
        { startLine: 41, endLine: 56, color: '#22c55e', label: 'ファクトリ', explanation: 'switch 式で適切な Notification を生成。sealed なので網羅性が保証される。' },
        { startLine: 59, endLine: 69, color: '#ec4899', label: '利用側', explanation: '具象 Notification を知らない。ファクトリが隠蔽。' },
      ],
      keyPoints: [
        '生成ロジックをファクトリに集約',
        'sealed + switch 式でコンパイル時に網羅性チェック',
        'record で不変の具象プロダクトを定義',
        '利用側は具象クラスに依存しない',
      ],
    },
    {
      id: 20,
      title: 'Chain of Responsibility',
      titleJa: '責任の連鎖',
      difficulty: 'intermediate',
      category: 'Design Patterns',
      description: 'リクエストを一連のハンドラに渡し、適切なハンドラが処理するパターンです。',
      code: `// ハンドラインターフェース
public interface RequestHandler {
    Optional<Response> handle(Request request);
}

// 具象ハンドラ1: 認証チェック
public class AuthenticationHandler implements RequestHandler {
    private final TokenService tokenService;

    public AuthenticationHandler(TokenService tokenService) {
        this.tokenService = tokenService;
    }

    @Override
    public Optional<Response> handle(Request request) {
        String token = request.getHeader("Authorization");
        if (token == null || token.isBlank()) {
            return Optional.of(Response.unauthorized("認証トークンがありません"));
        }
        if (!tokenService.isValid(token)) {
            return Optional.of(Response.unauthorized("無効なトークンです"));
        }
        request.setAttribute("userId", tokenService.getUserId(token));
        return Optional.empty(); // 次のハンドラへ
    }
}

// 具象ハンドラ2: レートリミット
public class RateLimitHandler implements RequestHandler {
    private final RateLimiter limiter;

    public RateLimitHandler(RateLimiter limiter) {
        this.limiter = limiter;
    }

    @Override
    public Optional<Response> handle(Request request) {
        String clientIp = request.getClientIp();
        if (!limiter.tryAcquire(clientIp)) {
            return Optional.of(Response.tooManyRequests("リクエスト過多"));
        }
        return Optional.empty();
    }
}

// 具象ハンドラ3: 入力バリデーション
public class ValidationHandler implements RequestHandler {
    @Override
    public Optional<Response> handle(Request request) {
        if (request.getBody() == null && request.isPost()) {
            return Optional.of(Response.badRequest("リクエストボディが必要です"));
        }
        return Optional.empty();
    }
}

// パイプライン: ハンドラを連鎖実行
public class RequestPipeline {
    private final List<RequestHandler> handlers;
    private final RequestHandler finalHandler;

    public RequestPipeline(List<RequestHandler> handlers,
                           RequestHandler finalHandler) {
        this.handlers = List.copyOf(handlers);
        this.finalHandler = finalHandler;
    }

    public Response process(Request request) {
        for (RequestHandler handler : handlers) {
            Optional<Response> response = handler.handle(request);
            if (response.isPresent()) {
                return response.get(); // チェーンを中断
            }
        }
        // 全ハンドラを通過 → 最終処理
        return finalHandler.handle(request)
            .orElse(Response.ok("処理完了"));
    }
}

// 組み立て例
// var pipeline = new RequestPipeline(
//     List.of(
//         new AuthenticationHandler(tokenService),
//         new RateLimitHandler(limiter),
//         new ValidationHandler()
//     ),
//     businessLogicHandler
// );`,
      highlights: [
        { startLine: 2, endLine: 4, color: '#a855f7', label: 'ハンドラIF', explanation: 'Optional<Response>: 空なら次へ、値があればチェーン中断。' },
        { startLine: 7, endLine: 26, color: '#ef4444', label: '認証ハンドラ', explanation: 'トークン検証。無効ならレスポンスを返して中断。' },
        { startLine: 29, endLine: 44, color: '#f59e0b', label: 'レートリミット', explanation: 'IPベースのレート制限。' },
        { startLine: 57, endLine: 79, color: '#22c55e', label: 'パイプライン', explanation: 'ハンドラを順に実行。途中で中断か全通過で最終処理。' },
      ],
      keyPoints: [
        'ハンドラを連鎖させてリクエストを順に処理',
        'Optional で「処理した/次へ渡す」を表現',
        'パイプラインで処理の順序と組み合わせを柔軟に変更',
        'ミドルウェアパターンとしてWeb フレームワークで広く使用',
      ],
    },
    {
      id: 21,
      title: 'Generic Type-Safe Collections',
      titleJa: 'ジェネリクスで型安全なコレクション',
      difficulty: 'intermediate',
      category: 'Modern Java',
      description: 'ジェネリクスを活用した型安全なデータ構造とユーティリティの設計です。',
      code: `import java.util.*;
import java.util.function.*;

// 型安全な結果型（Either パターン）
public sealed interface Result<T> {
    record Success<T>(T value) implements Result<T> {}
    record Failure<T>(String error, Exception cause) implements Result<T> {}

    default <U> Result<U> map(Function<T, U> fn) {
        return switch (this) {
            case Success<T> s -> new Success<>(fn.apply(s.value()));
            case Failure<T> f -> new Failure<>(f.error(), f.cause());
        };
    }

    default <U> Result<U> flatMap(Function<T, Result<U>> fn) {
        return switch (this) {
            case Success<T> s -> fn.apply(s.value());
            case Failure<T> f -> new Failure<>(f.error(), f.cause());
        };
    }

    default T orElse(T defaultValue) {
        return switch (this) {
            case Success<T> s -> s.value();
            case Failure<T> f -> defaultValue;
        };
    }

    default T orElseThrow() {
        return switch (this) {
            case Success<T> s -> s.value();
            case Failure<T> f -> throw new RuntimeException(f.error(), f.cause());
        };
    }

    static <T> Result<T> of(Supplier<T> supplier) {
        try {
            return new Success<>(supplier.get());
        } catch (Exception e) {
            return new Failure<>(e.getMessage(), e);
        }
    }
}

// 使用例
public class UserService {
    public Result<User> findUser(long id) {
        return Result.of(() -> repository.findById(id)
            .orElseThrow(() -> new RuntimeException("ユーザーが見つかりません")));
    }

    public Result<String> getUserEmail(long id) {
        return findUser(id)
            .map(User::getEmail);
    }

    public Result<Order> createOrderForUser(long userId) {
        return findUser(userId)
            .flatMap(user -> Result.of(() -> orderService.create(user)));
    }
}`,
      highlights: [
        { startLine: 5, endLine: 7, color: '#a855f7', label: 'sealed Result', explanation: 'Success または Failure のみ。コンパイル時に安全。' },
        { startLine: 9, endLine: 14, color: '#22c55e', label: 'map', explanation: '成功値を変換。失敗時はそのまま伝播。' },
        { startLine: 16, endLine: 21, color: '#22c55e', label: 'flatMap', explanation: 'ネストした Result を平坦化。チェーン可能。' },
        { startLine: 37, endLine: 43, color: '#3b82f6', label: 'of ファクトリ', explanation: '例外を自動的に Failure に変換するユーティリティ。' },
        { startLine: 47, endLine: 62, color: '#ec4899', label: '利用例', explanation: 'map/flatMap チェーンでエラーハンドリングを宣言的に。' },
      ],
      keyPoints: [
        'sealed interface + record でResult型を実現',
        'map/flatMap で関数型のエラーハンドリング',
        'try-catch の代わりに Result チェーンで宣言的に',
        'Optional と同様の操作感で例外情報も保持',
      ],
    },
    {
      id: 22,
      title: 'Unit Testing Best Practices',
      titleJa: 'ユニットテスト設計',
      difficulty: 'intermediate',
      category: 'Testing',
      description: 'テスト容易性の高いコード設計と、AAA パターンによるクリーンなテストを学びます。',
      bookReference: '達人プログラマー 第41節',
      code: `// テスト対象: PricingService
public class PricingService {
    private final DiscountRepository discountRepo;
    private final TaxCalculator taxCalculator;

    public PricingService(DiscountRepository discountRepo,
                          TaxCalculator taxCalculator) {
        this.discountRepo = discountRepo;
        this.taxCalculator = taxCalculator;
    }

    public Money calculateFinalPrice(Order order, String couponCode) {
        Money subtotal = order.getSubtotal();
        Money discount = applyCoupon(subtotal, couponCode);
        Money afterDiscount = subtotal.subtract(discount);
        Money tax = taxCalculator.calculate(afterDiscount);
        return afterDiscount.add(tax);
    }

    private Money applyCoupon(Money subtotal, String couponCode) {
        if (couponCode == null) return Money.zero("JPY");
        return discountRepo.findByCouponCode(couponCode)
            .map(d -> d.apply(subtotal))
            .orElse(Money.zero("JPY"));
    }
}

// テストコード（JUnit 5 + AssertJ スタイル）
class PricingServiceTest {

    // フェイク実装（テストダブル）
    private final DiscountRepository fakeRepo = new InMemoryDiscountRepository();
    private final TaxCalculator fakeTax = amount -> new Money(
        Math.round(amount.amount() * 0.10), amount.currency()
    );
    private final PricingService service = new PricingService(fakeRepo, fakeTax);

    @Test
    void shouldReturnSubtotalPlusTax_whenNoCoupon() {
        // Arrange: テストデータ準備
        Order order = OrderBuilder.create()
            .withItem("商品A", 1000)
            .withItem("商品B", 2000)
            .build();

        // Act: テスト実行
        Money result = service.calculateFinalPrice(order, null);

        // Assert: 結果検証 (3000 + 10% = 3300)
        assertThat(result.amount()).isEqualTo(3300);
        assertThat(result.currency()).isEqualTo("JPY");
    }

    @Test
    void shouldApplyDiscount_whenValidCoupon() {
        // Arrange
        fakeRepo.save(new Discount("SAVE500", Money.fixed(500, "JPY")));
        Order order = OrderBuilder.create()
            .withItem("商品A", 3000)
            .build();

        // Act
        Money result = service.calculateFinalPrice(order, "SAVE500");

        // Assert: (3000 - 500) * 1.10 = 2750
        assertThat(result.amount()).isEqualTo(2750);
    }

    @Test
    void shouldIgnoreInvalidCoupon() {
        // Arrange
        Order order = OrderBuilder.create()
            .withItem("商品A", 1000)
            .build();

        // Act
        Money result = service.calculateFinalPrice(order, "INVALID");

        // Assert: クーポン無効 → 割引なし (1000 * 1.10 = 1100)
        assertThat(result.amount()).isEqualTo(1100);
    }
}`,
      highlights: [
        { startLine: 2, endLine: 26, color: '#f59e0b', label: 'テスト対象', explanation: 'DI でテスト容易。依存をコンストラクタで注入。' },
        { startLine: 32, endLine: 36, color: '#3b82f6', label: 'テストダブル', explanation: 'Fake 実装で外部依存を排除。' },
        { startLine: 40, endLine: 52, color: '#22c55e', label: 'AAA パターン', explanation: 'Arrange（準備）→ Act（実行）→ Assert（検証）の3ステップ。' },
        { startLine: 54, endLine: 67, color: '#22c55e', label: 'クーポン適用テスト', explanation: '境界条件のテスト。期待値を明確にコメント。' },
      ],
      keyPoints: [
        'AAA パターン: Arrange → Act → Assert',
        'テストダブル (Fake/Mock) で外部依存を排除',
        'Builder パターンでテストデータを読みやすく生成',
        '1テスト = 1つの振る舞い検証',
      ],
    },

    // ===== ADVANCED (id 23-33) =====
    {
      id: 23,
      title: 'Clean Architecture',
      titleJa: 'クリーンアーキテクチャ',
      difficulty: 'advanced',
      category: 'Architecture',
      description: '依存性の方向を制御し、ドメインロジックを外部技術から完全に独立させるアーキテクチャ。',
      bookReference: 'Clean Architecture 第22章',
      code: `// ===== Domain Layer (最内層: 外部依存ゼロ) =====

// Value Object
public record ProductId(String value) {
    public ProductId {
        if (value == null || value.isBlank())
            throw new IllegalArgumentException("ProductId は必須");
    }
}

public record Money(long amount, String currency) {
    public Money add(Money other) {
        if (!currency.equals(other.currency()))
            throw new IllegalArgumentException("通貨不一致");
        return new Money(amount + other.amount(), currency);
    }

    public static Money yen(long amount) {
        return new Money(amount, "JPY");
    }
}

// Entity
public class Product {
    private final ProductId id;
    private String name;
    private Money price;
    private int stockQuantity;

    public Product(ProductId id, String name, Money price, int stockQuantity) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.stockQuantity = stockQuantity;
    }

    public void reduceStock(int quantity) {
        if (quantity > stockQuantity) {
            throw new InsufficientStockException(id, stockQuantity, quantity);
        }
        stockQuantity -= quantity;
    }

    public boolean isInStock() {
        return stockQuantity > 0;
    }

    // getters...
    public ProductId getId() { return id; }
    public String getName() { return name; }
    public Money getPrice() { return price; }
    public int getStockQuantity() { return stockQuantity; }
}

// Domain Exception
public class InsufficientStockException extends RuntimeException {
    public InsufficientStockException(ProductId id, int available, int requested) {
        super(String.format("在庫不足 [%s]: 在庫 %d, 要求 %d", id.value(), available, requested));
    }
}

// Port (Repository Interface)
public interface ProductRepository {
    Optional<Product> findById(ProductId id);
    Product save(Product product);
    List<Product> findInStock();
}

// ===== Application Layer (ユースケース) =====

// Input DTO
public record PurchaseCommand(String productId, int quantity) {}

// Output DTO
public record PurchaseResult(String productName, long totalAmount, int remainingStock) {}

// Use Case
public class PurchaseProductUseCase {
    private final ProductRepository productRepository;

    public PurchaseProductUseCase(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public PurchaseResult execute(PurchaseCommand command) {
        ProductId productId = new ProductId(command.productId());

        Product product = productRepository.findById(productId)
            .orElseThrow(() -> new EntityNotFoundException("商品", productId.value()));

        product.reduceStock(command.quantity());
        productRepository.save(product);

        Money total = Money.yen(product.getPrice().amount() * command.quantity());

        return new PurchaseResult(
            product.getName(),
            total.amount(),
            product.getStockQuantity()
        );
    }
}

// ===== Infrastructure Layer (外部技術の実装) =====

public class JpaProductRepository implements ProductRepository {
    private final JpaProductDao dao;
    private final ProductMapper mapper;

    public JpaProductRepository(JpaProductDao dao, ProductMapper mapper) {
        this.dao = dao;
        this.mapper = mapper;
    }

    @Override
    public Optional<Product> findById(ProductId id) {
        return dao.findById(id.value()).map(mapper::toDomain);
    }

    @Override
    public Product save(Product product) {
        ProductEntity entity = mapper.toEntity(product);
        dao.save(entity);
        return product;
    }

    @Override
    public List<Product> findInStock() {
        return dao.findByStockQuantityGreaterThan(0).stream()
            .map(mapper::toDomain)
            .toList();
    }
}

// ===== Presentation Layer (Controller) =====

public class ProductController {
    private final PurchaseProductUseCase purchaseUseCase;

    public ProductController(PurchaseProductUseCase purchaseUseCase) {
        this.purchaseUseCase = purchaseUseCase;
    }

    public ApiResponse<PurchaseResult> purchase(PurchaseRequest request) {
        try {
            PurchaseCommand command = new PurchaseCommand(
                request.getProductId(), request.getQuantity()
            );
            PurchaseResult result = purchaseUseCase.execute(command);
            return ApiResponse.success(result);
        } catch (InsufficientStockException e) {
            return ApiResponse.error(409, e.getMessage());
        } catch (EntityNotFoundException e) {
            return ApiResponse.error(404, e.getMessage());
        }
    }
}`,
      highlights: [
        { startLine: 3, endLine: 60, color: '#f59e0b', label: 'Domain Layer', explanation: 'Value Object + Entity + Domain Exception。外部依存ゼロ。' },
        { startLine: 62, endLine: 67, color: '#a855f7', label: 'Port (IF)', explanation: 'ドメイン層がインフラに求めるインターフェース。' },
        { startLine: 77, endLine: 102, color: '#22c55e', label: 'Use Case', explanation: 'ビジネスルールのオーケストレーション。' },
        { startLine: 104, endLine: 133, color: '#3b82f6', label: 'Infrastructure', explanation: 'JPA実装。ドメインオブジェクトとDBエンティティをマッピング。' },
        { startLine: 135, endLine: 157, color: '#ec4899', label: 'Controller', explanation: 'HTTPリクエストをコマンドに変換、結果をレスポンスに。' },
      ],
      keyPoints: [
        '依存の方向は外→内。ドメイン層は何にも依存しない',
        'Port（IF）をドメイン層に置き、実装はインフラ層',
        'UseCaseがドメインルールのオーケストレーション',
        '各層は独立してテスト可能',
        'フレームワーク・DB変更がドメインに影響しない',
      ],
    },
    {
      id: 24,
      title: 'Domain-Driven Design',
      titleJa: 'ドメイン駆動設計',
      difficulty: 'advanced',
      category: 'Architecture',
      description: 'Entity, Value Object, Aggregate, Domain Serviceの設計。DDDの戦術パターンを実装します。',
      bookReference: 'エリック・エヴァンスのDDD',
      code: `// ===== Value Objects =====

public record OrderId(String value) {
    public OrderId {
        if (value == null || value.isBlank()) throw new IllegalArgumentException("OrderId 必須");
    }
    public static OrderId generate() {
        return new OrderId(java.util.UUID.randomUUID().toString());
    }
}

public record Quantity(int value) {
    public Quantity {
        if (value <= 0) throw new IllegalArgumentException("数量は1以上: " + value);
    }
    public Quantity add(Quantity other) { return new Quantity(value + other.value()); }
}

public record Money(long amount, String currency) {
    public Money multiply(int factor) { return new Money(amount * factor, currency); }
    public Money add(Money other) {
        if (!currency.equals(other.currency())) throw new IllegalArgumentException("通貨不一致");
        return new Money(amount + other.amount(), currency);
    }
    public static Money yen(long amount) { return new Money(amount, "JPY"); }
    public static Money zero() { return new Money(0, "JPY"); }
}

// ===== Entity (Aggregate内の子Entity) =====

public class OrderItem {
    private final ProductId productId;
    private final String productName;
    private final Money unitPrice;
    private final Quantity quantity;

    public OrderItem(ProductId productId, String productName,
                     Money unitPrice, Quantity quantity) {
        this.productId = productId;
        this.productName = productName;
        this.unitPrice = unitPrice;
        this.quantity = quantity;
    }

    public Money subtotal() {
        return unitPrice.multiply(quantity.value());
    }

    public ProductId getProductId() { return productId; }
    public Quantity getQuantity() { return quantity; }
}

// ===== Aggregate Root =====

public class Order {
    private final OrderId id;
    private final CustomerId customerId;
    private final List<OrderItem> items;
    private OrderStatus status;
    private final List<DomainEvent> domainEvents = new ArrayList<>();

    // ファクトリメソッド（コンストラクタを隠蔽）
    public static Order create(CustomerId customerId) {
        Order order = new Order(OrderId.generate(), customerId);
        order.addEvent(new OrderCreatedEvent(order.id, customerId));
        return order;
    }

    private Order(OrderId id, CustomerId customerId) {
        this.id = id;
        this.customerId = customerId;
        this.items = new ArrayList<>();
        this.status = OrderStatus.DRAFT;
    }

    // ドメインロジック: 商品追加
    public void addItem(ProductId productId, String name,
                        Money price, Quantity qty) {
        if (status != OrderStatus.DRAFT) {
            throw new BusinessRuleViolation("確定済みの注文に商品を追加できません");
        }
        if (items.size() >= 50) {
            throw new BusinessRuleViolation("1注文あたり最大50品目です");
        }
        items.add(new OrderItem(productId, name, price, qty));
    }

    // ドメインロジック: 注文確定
    public void confirm() {
        if (status != OrderStatus.DRAFT) {
            throw new BusinessRuleViolation("DRAFT 状態でのみ確定できます");
        }
        if (items.isEmpty()) {
            throw new BusinessRuleViolation("空の注文は確定できません");
        }
        status = OrderStatus.CONFIRMED;
        addEvent(new OrderConfirmedEvent(id, calculateTotal()));
    }

    // ドメインロジック: キャンセル
    public void cancel(String reason) {
        if (!status.isCancellable()) {
            throw new BusinessRuleViolation(
                status.getDisplayName() + " 状態ではキャンセルできません");
        }
        status = OrderStatus.CANCELLED;
        addEvent(new OrderCancelledEvent(id, reason));
    }

    public Money calculateTotal() {
        return items.stream()
            .map(OrderItem::subtotal)
            .reduce(Money.zero(), Money::add);
    }

    private void addEvent(DomainEvent event) {
        domainEvents.add(event);
    }

    public List<DomainEvent> pullEvents() {
        List<DomainEvent> events = List.copyOf(domainEvents);
        domainEvents.clear();
        return events;
    }

    public OrderId getId() { return id; }
    public OrderStatus getStatus() { return status; }
}

// ===== Domain Events =====

public sealed interface DomainEvent permits
    OrderCreatedEvent, OrderConfirmedEvent, OrderCancelledEvent {}

public record OrderCreatedEvent(OrderId orderId, CustomerId customerId)
    implements DomainEvent {}
public record OrderConfirmedEvent(OrderId orderId, Money total)
    implements DomainEvent {}
public record OrderCancelledEvent(OrderId orderId, String reason)
    implements DomainEvent {}

// ===== Domain Service =====

public class OrderDomainService {
    private final ProductRepository productRepo;

    public OrderDomainService(ProductRepository productRepo) {
        this.productRepo = productRepo;
    }

    public void addProductToOrder(Order order, ProductId productId, Quantity qty) {
        Product product = productRepo.findById(productId)
            .orElseThrow(() -> new EntityNotFoundException("商品", productId.value()));

        if (product.getStockQuantity() < qty.value()) {
            throw new InsufficientStockException(productId,
                product.getStockQuantity(), qty.value());
        }

        order.addItem(productId, product.getName(), product.getPrice(), qty);
    }
}`,
      highlights: [
        { startLine: 3, endLine: 27, color: '#f59e0b', label: 'Value Objects', explanation: '不変・自己検証・等値比較。ドメインの基本構成要素。' },
        { startLine: 31, endLine: 51, color: '#3b82f6', label: '子Entity', explanation: 'OrderItem は Order を通じてのみアクセスされる。' },
        { startLine: 55, endLine: 128, color: '#22c55e', label: 'Aggregate Root', explanation: 'Order が整合性境界。ドメインルールとイベント発行の責務を持つ。' },
        { startLine: 130, endLine: 140, color: '#a855f7', label: 'Domain Events', explanation: 'sealed interface + record で不変のイベントを型安全に定義。' },
        { startLine: 142, endLine: 162, color: '#ec4899', label: 'Domain Service', explanation: '複数Aggregate をまたぐロジック。Entity に収まらない処理。' },
      ],
      keyPoints: [
        'Value Object は不変・自己検証・record で表現',
        'Aggregate Root が整合性の境界を管理',
        'ドメインイベントで副作用を疎結合に伝播',
        'Domain Service は複数 Aggregate をまたぐロジック用',
        'ファクトリメソッドで不変条件を保証して生成',
      ],
    },
    {
      id: 25,
      title: 'Event Sourcing',
      titleJa: 'イベントソーシング',
      difficulty: 'advanced',
      category: 'Architecture',
      description: '状態を直接保存するのではなく、イベントの列から状態を再構築するアーキテクチャパターン。',
      code: `// ===== Events =====

public sealed interface AccountEvent {
    String accountId();
    java.time.Instant occurredAt();
}

public record AccountOpened(String accountId, String ownerName,
    java.time.Instant occurredAt) implements AccountEvent {}

public record MoneyDeposited(String accountId, long amount,
    String description, java.time.Instant occurredAt) implements AccountEvent {}

public record MoneyWithdrawn(String accountId, long amount,
    String description, java.time.Instant occurredAt) implements AccountEvent {}

public record AccountClosed(String accountId, String reason,
    java.time.Instant occurredAt) implements AccountEvent {}

// ===== Aggregate (イベントから状態を復元) =====

public class BankAccount {
    private String id;
    private String ownerName;
    private long balance;
    private boolean closed;
    private final List<AccountEvent> uncommittedEvents = new ArrayList<>();
    private int version;

    // イベント列から復元（リプレイ）
    public static BankAccount fromHistory(List<AccountEvent> history) {
        BankAccount account = new BankAccount();
        for (AccountEvent event : history) {
            account.apply(event);
            account.version++;
        }
        return account;
    }

    // コマンド: 口座開設
    public static BankAccount open(String accountId, String ownerName) {
        BankAccount account = new BankAccount();
        account.raiseEvent(new AccountOpened(
            accountId, ownerName, java.time.Instant.now()));
        return account;
    }

    // コマンド: 入金
    public void deposit(long amount, String description) {
        if (closed) throw new IllegalStateException("閉鎖済み口座");
        if (amount <= 0) throw new IllegalArgumentException("入金額は正の数");
        raiseEvent(new MoneyDeposited(id, amount, description, java.time.Instant.now()));
    }

    // コマンド: 出金
    public void withdraw(long amount, String description) {
        if (closed) throw new IllegalStateException("閉鎖済み口座");
        if (amount <= 0) throw new IllegalArgumentException("出金額は正の数");
        if (amount > balance) throw new IllegalStateException("残高不足: " + balance);
        raiseEvent(new MoneyWithdrawn(id, amount, description, java.time.Instant.now()));
    }

    // コマンド: 口座閉鎖
    public void close(String reason) {
        if (closed) throw new IllegalStateException("既に閉鎖済み");
        if (balance != 0) throw new IllegalStateException("残高が0でないと閉鎖できません");
        raiseEvent(new AccountClosed(id, reason, java.time.Instant.now()));
    }

    // イベント適用（状態変更の唯一のポイント）
    private void apply(AccountEvent event) {
        switch (event) {
            case AccountOpened e -> {
                this.id = e.accountId();
                this.ownerName = e.ownerName();
                this.balance = 0;
                this.closed = false;
            }
            case MoneyDeposited e -> this.balance += e.amount();
            case MoneyWithdrawn e -> this.balance -= e.amount();
            case AccountClosed e -> this.closed = true;
        }
    }

    private void raiseEvent(AccountEvent event) {
        apply(event);
        uncommittedEvents.add(event);
    }

    public List<AccountEvent> getUncommittedEvents() {
        return List.copyOf(uncommittedEvents);
    }

    public void markCommitted() {
        uncommittedEvents.clear();
    }

    public String getId() { return id; }
    public long getBalance() { return balance; }
    public int getVersion() { return version; }
}

// ===== Event Store =====

public class EventStore {
    private final Map<String, List<AccountEvent>> store = new ConcurrentHashMap<>();

    public void save(String aggregateId, List<AccountEvent> events, int expectedVersion) {
        store.compute(aggregateId, (key, existing) -> {
            List<AccountEvent> current = existing != null ? existing : new ArrayList<>();
            if (current.size() != expectedVersion) {
                throw new ConcurrencyException("楽観的ロック失敗: 期待 " +
                    expectedVersion + " 実際 " + current.size());
            }
            current.addAll(events);
            return current;
        });
    }

    public List<AccountEvent> load(String aggregateId) {
        return List.copyOf(store.getOrDefault(aggregateId, List.of()));
    }
}

// ===== Application Service =====

public class AccountService {
    private final EventStore eventStore;

    public AccountService(EventStore eventStore) {
        this.eventStore = eventStore;
    }

    public void openAccount(String id, String ownerName) {
        BankAccount account = BankAccount.open(id, ownerName);
        eventStore.save(id, account.getUncommittedEvents(), 0);
        account.markCommitted();
    }

    public void deposit(String id, long amount, String description) {
        List<AccountEvent> history = eventStore.load(id);
        BankAccount account = BankAccount.fromHistory(history);
        account.deposit(amount, description);
        eventStore.save(id, account.getUncommittedEvents(), account.getVersion());
        account.markCommitted();
    }

    public long getBalance(String id) {
        List<AccountEvent> history = eventStore.load(id);
        BankAccount account = BankAccount.fromHistory(history);
        return account.getBalance();
    }
}`,
      highlights: [
        { startLine: 3, endLine: 18, color: '#f59e0b', label: 'Event定義', explanation: 'sealed interface + record で型安全なイベント。不変データ。' },
        { startLine: 22, endLine: 38, color: '#22c55e', label: 'イベントリプレイ', explanation: 'fromHistory で過去のイベントを順に適用し、現在の状態を復元。' },
        { startLine: 70, endLine: 83, color: '#a855f7', label: 'apply（状態変更）', explanation: 'switch式で各イベントを処理。状態変更はここだけ。' },
        { startLine: 103, endLine: 123, color: '#3b82f6', label: 'Event Store', explanation: '楽観的ロック付きのイベント保存。並行書き込みを検出。' },
        { startLine: 125, endLine: 153, color: '#ec4899', label: 'Application Service', explanation: 'イベントをロード→リプレイ→コマンド実行→イベント保存。' },
      ],
      keyPoints: [
        '状態を保存せず、イベントの列を保存する',
        'fromHistory でイベントを再生して現在状態を復元',
        'apply() が状態変更の唯一のポイント',
        '楽観的ロックで並行更新の衝突を検出',
        '完全な監査ログが自動的に得られる',
      ],
    },
    {
      id: 26,
      title: 'CQRS Pattern',
      titleJa: 'CQRSパターン',
      difficulty: 'advanced',
      category: 'Architecture',
      description: 'コマンド（書き込み）とクエリ（読み取り）を完全に分離するアーキテクチャパターン。',
      code: `// ===== Command Side =====

// コマンド
public sealed interface OrderCommand {
    record CreateOrder(String customerId, List<OrderItem> items)
        implements OrderCommand {}
    record ConfirmOrder(String orderId) implements OrderCommand {}
    record CancelOrder(String orderId, String reason) implements OrderCommand {}
}

// コマンドハンドラ
public class OrderCommandHandler {
    private final OrderRepository orderRepo;
    private final EventPublisher eventPublisher;

    public OrderCommandHandler(OrderRepository orderRepo,
                               EventPublisher eventPublisher) {
        this.orderRepo = orderRepo;
        this.eventPublisher = eventPublisher;
    }

    public String handle(OrderCommand.CreateOrder cmd) {
        Order order = Order.create(new CustomerId(cmd.customerId()));
        for (var item : cmd.items()) {
            order.addItem(item.productId(), item.name(),
                item.price(), item.quantity());
        }
        orderRepo.save(order);
        eventPublisher.publishAll(order.pullEvents());
        return order.getId().value();
    }

    public void handle(OrderCommand.ConfirmOrder cmd) {
        Order order = orderRepo.findById(new OrderId(cmd.orderId()))
            .orElseThrow(() -> new EntityNotFoundException("注文", cmd.orderId()));
        order.confirm();
        orderRepo.save(order);
        eventPublisher.publishAll(order.pullEvents());
    }

    public void handle(OrderCommand.CancelOrder cmd) {
        Order order = orderRepo.findById(new OrderId(cmd.orderId()))
            .orElseThrow(() -> new EntityNotFoundException("注文", cmd.orderId()));
        order.cancel(cmd.reason());
        orderRepo.save(order);
        eventPublisher.publishAll(order.pullEvents());
    }
}

// ===== Query Side =====

// 読み取り専用ビュー（非正規化した読み取り用モデル）
public record OrderView(
    String orderId,
    String customerName,
    String status,
    long totalAmount,
    int itemCount,
    String createdAt,
    List<OrderItemView> items
) {}

public record OrderItemView(String productName, long price, int quantity) {}

// クエリインターフェース
public interface OrderQueryService {
    Optional<OrderView> findById(String orderId);
    List<OrderView> findByCustomer(String customerId);
    List<OrderView> findByStatus(String status, int page, int size);
    OrderStatistics getStatistics(String from, String to);
}

// クエリ実装（読み取り最適化）
public class OrderQueryServiceImpl implements OrderQueryService {
    private final ReadOnlyDataSource readDb;

    public OrderQueryServiceImpl(ReadOnlyDataSource readDb) {
        this.readDb = readDb;
    }

    @Override
    public Optional<OrderView> findById(String orderId) {
        return readDb.queryOne(
            "SELECT * FROM order_views WHERE order_id = ?",
            orderId,
            this::mapToOrderView
        );
    }

    @Override
    public List<OrderView> findByCustomer(String customerId) {
        return readDb.query(
            "SELECT * FROM order_views WHERE customer_id = ? ORDER BY created_at DESC",
            customerId,
            this::mapToOrderView
        );
    }

    @Override
    public List<OrderView> findByStatus(String status, int page, int size) {
        return readDb.query(
            "SELECT * FROM order_views WHERE status = ? LIMIT ? OFFSET ?",
            new Object[]{status, size, page * size},
            this::mapToOrderView
        );
    }

    @Override
    public OrderStatistics getStatistics(String from, String to) {
        return readDb.queryOne(
            "SELECT COUNT(*) as total, SUM(total_amount) as revenue " +
            "FROM order_views WHERE created_at BETWEEN ? AND ?",
            new Object[]{from, to},
            rs -> new OrderStatistics(rs.getLong("total"), rs.getLong("revenue"))
        ).orElse(new OrderStatistics(0, 0));
    }

    private OrderView mapToOrderView(ResultSet rs) { /* mapping */ return null; }
}

// ===== Projection (イベントからRead Modelを更新) =====

public class OrderProjection {
    private final ReadWriteDataSource writeDb;

    public OrderProjection(ReadWriteDataSource writeDb) {
        this.writeDb = writeDb;
    }

    public void on(OrderCreatedEvent event) {
        writeDb.execute(
            "INSERT INTO order_views (order_id, customer_id, status, total_amount, created_at) " +
            "VALUES (?, ?, 'DRAFT', 0, ?)",
            event.orderId().value(), event.customerId().value(), event.occurredAt()
        );
    }

    public void on(OrderConfirmedEvent event) {
        writeDb.execute(
            "UPDATE order_views SET status = 'CONFIRMED', total_amount = ? WHERE order_id = ?",
            event.total().amount(), event.orderId().value()
        );
    }

    public void on(OrderCancelledEvent event) {
        writeDb.execute(
            "UPDATE order_views SET status = 'CANCELLED' WHERE order_id = ?",
            event.orderId().value()
        );
    }
}`,
      highlights: [
        { startLine: 3, endLine: 9, color: '#f59e0b', label: 'Command定義', explanation: 'sealed interface の record でコマンドを型安全に。' },
        { startLine: 12, endLine: 48, color: '#22c55e', label: 'Command Handler', explanation: '書き込み側。ドメインロジックを実行しイベント発行。' },
        { startLine: 52, endLine: 63, color: '#3b82f6', label: 'Read Model', explanation: '読み取り用に最適化された非正規化ビュー。' },
        { startLine: 66, endLine: 71, color: '#a855f7', label: 'Query IF', explanation: '読み取り専用のインターフェース。' },
        { startLine: 121, endLine: 151, color: '#ec4899', label: 'Projection', explanation: 'イベントを受信してRead Modelを更新。' },
      ],
      keyPoints: [
        'Command（書き込み）と Query（読み取り）を完全分離',
        'Write Model はドメインルール重視、Read Model は読み取り最適化',
        'Projection がイベントから Read Model を構築',
        'それぞれ独立してスケーリング可能',
        'Event Sourcing と組み合わせるとさらに強力',
      ],
    },
    {
      id: 27,
      title: 'Plugin Architecture',
      titleJa: 'プラグインアーキテクチャ',
      difficulty: 'advanced',
      category: 'Architecture',
      description: 'ServiceLoader と SPI を使った拡張可能なプラグインシステムの設計です。',
      bookReference: '達人プログラマー 第17節',
      code: `// ===== Plugin SPI (Service Provider Interface) =====

// プラグインインターフェース
public interface PaymentPlugin {
    String getId();
    String getDisplayName();
    boolean supports(PaymentMethod method);
    PaymentResult process(PaymentRequest request);
    void refund(String transactionId, long amount);
}

// プラグインの設定
public interface PluginConfigurable {
    void configure(Map<String, String> config);
    Map<String, String> getRequiredConfig();
}

// ライフサイクル管理
public interface PluginLifecycle {
    default void onLoad() {}
    default void onEnable() {}
    default void onDisable() {}
    default void onUnload() {}
}

// 完全なプラグイン基底
public abstract class AbstractPaymentPlugin
    implements PaymentPlugin, PluginConfigurable, PluginLifecycle {

    protected Map<String, String> config = Map.of();

    @Override
    public void configure(Map<String, String> config) {
        this.config = Map.copyOf(config);
        validateConfig();
    }

    protected void validateConfig() {
        for (String key : getRequiredConfig().keySet()) {
            if (!config.containsKey(key)) {
                throw new PluginConfigException(
                    getId() + ": 必須設定 '" + key + "' がありません");
            }
        }
    }
}

// ===== 具象プラグイン =====

public class StripePlugin extends AbstractPaymentPlugin {
    private StripeClient client;

    @Override
    public String getId() { return "stripe"; }

    @Override
    public String getDisplayName() { return "Stripe決済"; }

    @Override
    public boolean supports(PaymentMethod method) {
        return method == PaymentMethod.CREDIT_CARD;
    }

    @Override
    public Map<String, String> getRequiredConfig() {
        return Map.of("api_key", "Stripe APIキー", "webhook_secret", "Webhookシークレット");
    }

    @Override
    public void onLoad() {
        client = new StripeClient(config.get("api_key"));
    }

    @Override
    public PaymentResult process(PaymentRequest request) {
        var charge = client.createCharge(request.amount(), request.currency());
        return new PaymentResult(charge.id(), charge.status());
    }

    @Override
    public void refund(String transactionId, long amount) {
        client.createRefund(transactionId, amount);
    }
}

// ===== Plugin Registry =====

public class PluginRegistry {
    private final Map<String, PaymentPlugin> plugins = new LinkedHashMap<>();
    private final Map<String, Map<String, String>> configs;

    public PluginRegistry(Map<String, Map<String, String>> configs) {
        this.configs = configs;
    }

    public void loadPlugins() {
        ServiceLoader<PaymentPlugin> loader = ServiceLoader.load(PaymentPlugin.class);
        for (PaymentPlugin plugin : loader) {
            registerPlugin(plugin);
        }
    }

    public void registerPlugin(PaymentPlugin plugin) {
        String id = plugin.getId();
        if (plugins.containsKey(id)) {
            throw new PluginException("プラグイン重複: " + id);
        }

        if (plugin instanceof PluginConfigurable configurable) {
            Map<String, String> pluginConfig = configs.getOrDefault(id, Map.of());
            configurable.configure(pluginConfig);
        }
        if (plugin instanceof PluginLifecycle lifecycle) {
            lifecycle.onLoad();
            lifecycle.onEnable();
        }
        plugins.put(id, plugin);
    }

    public PaymentPlugin getPlugin(PaymentMethod method) {
        return plugins.values().stream()
            .filter(p -> p.supports(method))
            .findFirst()
            .orElseThrow(() -> new PluginException(
                method + " をサポートするプラグインがありません"));
    }

    public List<PaymentPlugin> getAllPlugins() {
        return List.copyOf(plugins.values());
    }

    public void shutdown() {
        plugins.values().forEach(plugin -> {
            if (plugin instanceof PluginLifecycle lifecycle) {
                lifecycle.onDisable();
                lifecycle.onUnload();
            }
        });
        plugins.clear();
    }
}`,
      highlights: [
        { startLine: 4, endLine: 10, color: '#a855f7', label: 'Plugin SPI', explanation: 'プラグインが実装すべきインターフェース。' },
        { startLine: 18, endLine: 24, color: '#a855f7', label: 'ライフサイクル', explanation: 'load/enable/disable/unload のフック。' },
        { startLine: 50, endLine: 84, color: '#3b82f6', label: 'Stripe実装', explanation: '具象プラグイン。設定 → 初期化 → 処理 を実装。' },
        { startLine: 86, endLine: 141, color: '#22c55e', label: 'Plugin Registry', explanation: 'ServiceLoader でプラグインを自動検出。設定注入 → ライフサイクル管理。' },
      ],
      keyPoints: [
        'SPI + ServiceLoader で実行時にプラグインを自動検出',
        'ライフサイクルフックで初期化・終了処理を管理',
        'instanceof パターンマッチングで安全にキャスト',
        '設定のバリデーションをプラグイン側で実施',
        'Registry パターンで一元管理',
      ],
    },
    {
      id: 28,
      title: 'Pipeline Pattern',
      titleJa: 'パイプラインパターン',
      difficulty: 'advanced',
      category: 'Architecture',
      description: 'データ処理をステージに分割し、パイプラインとして連結する関数型アーキテクチャ。',
      bookReference: '達人プログラマー 第30節',
      code: `import java.util.function.Function;

// ===== Pipeline Core =====

// ステージ: 入力 → 出力変換
@FunctionalInterface
public interface Stage<I, O> {
    O process(I input);

    default <R> Stage<I, R> andThen(Stage<O, R> next) {
        return input -> next.process(this.process(input));
    }
}

// パイプライン: ステージの連鎖
public class Pipeline<I, O> {
    private final Stage<I, O> composed;

    private Pipeline(Stage<I, O> stage) {
        this.composed = stage;
    }

    public static <T> Pipeline<T, T> start() {
        return new Pipeline<>(input -> input);
    }

    public <R> Pipeline<I, R> pipe(Stage<O, R> stage) {
        return new Pipeline<>(composed.andThen(stage));
    }

    public O execute(I input) {
        return composed.process(input);
    }
}

// ===== 画像処理パイプラインの例 =====

public record ImageData(
    byte[] pixels,
    int width,
    int height,
    String format,
    Map<String, Object> metadata
) {
    public ImageData withPixels(byte[] newPixels) {
        return new ImageData(newPixels, width, height, format, metadata);
    }
    public ImageData withSize(int w, int h) {
        return new ImageData(pixels, w, h, format, metadata);
    }
    public ImageData withMetadata(String key, Object value) {
        var m = new HashMap<>(metadata);
        m.put(key, value);
        return new ImageData(pixels, width, height, format, Map.copyOf(m));
    }
}

// 具象ステージ: リサイズ
public class ResizeStage implements Stage<ImageData, ImageData> {
    private final int maxWidth;
    private final int maxHeight;

    public ResizeStage(int maxWidth, int maxHeight) {
        this.maxWidth = maxWidth;
        this.maxHeight = maxHeight;
    }

    @Override
    public ImageData process(ImageData input) {
        if (input.width() <= maxWidth && input.height() <= maxHeight) {
            return input;
        }
        double ratio = Math.min(
            (double) maxWidth / input.width(),
            (double) maxHeight / input.height()
        );
        int newW = (int) (input.width() * ratio);
        int newH = (int) (input.height() * ratio);
        byte[] resized = ImageProcessor.resize(input.pixels(), newW, newH);
        return input.withPixels(resized).withSize(newW, newH)
            .withMetadata("resized", true);
    }
}

// 具象ステージ: ウォーターマーク
public class WatermarkStage implements Stage<ImageData, ImageData> {
    private final String text;

    public WatermarkStage(String text) {
        this.text = text;
    }

    @Override
    public ImageData process(ImageData input) {
        byte[] watermarked = ImageProcessor.addWatermark(input.pixels(), text);
        return input.withPixels(watermarked)
            .withMetadata("watermark", text);
    }
}

// 具象ステージ: フォーマット変換
public class ConvertFormatStage implements Stage<ImageData, ImageData> {
    private final String targetFormat;

    public ConvertFormatStage(String targetFormat) {
        this.targetFormat = targetFormat;
    }

    @Override
    public ImageData process(ImageData input) {
        byte[] converted = ImageProcessor.convert(input.pixels(), targetFormat);
        return new ImageData(converted, input.width(), input.height(),
            targetFormat, input.metadata());
    }
}

// ===== 組み立てと実行 =====

public class ImageService {
    public ImageData processUpload(ImageData rawImage) {
        var pipeline = Pipeline.<ImageData>start()
            .pipe(new ResizeStage(1920, 1080))
            .pipe(new WatermarkStage("© miruky"))
            .pipe(new ConvertFormatStage("webp"));

        return pipeline.execute(rawImage);
    }

    public ImageData processThumbnail(ImageData rawImage) {
        var pipeline = Pipeline.<ImageData>start()
            .pipe(new ResizeStage(200, 200))
            .pipe(new ConvertFormatStage("webp"));

        return pipeline.execute(rawImage);
    }
}`,
      highlights: [
        { startLine: 6, endLine: 13, color: '#a855f7', label: 'Stage IF', explanation: '@FunctionalInterface で andThen 合成をサポート。' },
        { startLine: 15, endLine: 34, color: '#22c55e', label: 'Pipeline Core', explanation: 'start → pipe → execute のフルーエントAPI。型安全なチェーン。' },
        { startLine: 38, endLine: 56, color: '#f59e0b', label: 'ImageData (不変)', explanation: 'with系メソッドで新インスタンスを返す不変データ。' },
        { startLine: 58, endLine: 83, color: '#3b82f6', label: 'リサイズStage', explanation: '具象ステージ。入力を受けて変換して返す。' },
        { startLine: 117, endLine: 136, color: '#ec4899', label: '組み立て', explanation: '用途ごとに異なるパイプラインを簡潔に構築。' },
      ],
      keyPoints: [
        'Stage の合成で処理パイプラインを構築',
        '各ステージは独立してテスト可能',
        '不変データを渡すことで副作用を排除',
        'パイプラインの組み替えで柔軟な処理フローを実現',
        '関数合成の考え方をオブジェクト指向で実装',
      ],
    },
    {
      id: 29,
      title: 'Circuit Breaker',
      titleJa: 'サーキットブレーカー',
      difficulty: 'advanced',
      category: 'Architecture',
      description: '外部サービスの障害を検出し、連鎖的な障害を防止するレジリエンスパターン。',
      code: `import java.time.Duration;
import java.time.Instant;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicReference;
import java.util.function.Supplier;

// サーキットブレーカーの状態
public enum CircuitState {
    CLOSED,     // 正常: リクエストを通す
    OPEN,       // 遮断: リクエストを即座に拒否
    HALF_OPEN   // 試行: 限定的にリクエストを通す
}

// 設定
public record CircuitBreakerConfig(
    int failureThreshold,     // OPEN に切り替わる連続失敗数
    Duration openDuration,    // OPEN 状態の持続時間
    int halfOpenMaxAttempts   // HALF_OPEN で許可する試行数
) {
    public static CircuitBreakerConfig defaults() {
        return new CircuitBreakerConfig(5, Duration.ofSeconds(30), 3);
    }
}

// サーキットブレーカー本体
public class CircuitBreaker {
    private final String name;
    private final CircuitBreakerConfig config;
    private final AtomicReference<CircuitState> state =
        new AtomicReference<>(CircuitState.CLOSED);
    private final AtomicInteger failureCount = new AtomicInteger(0);
    private final AtomicInteger halfOpenAttempts = new AtomicInteger(0);
    private volatile Instant lastFailureTime = Instant.MIN;

    // メトリクス
    private final AtomicInteger totalCalls = new AtomicInteger(0);
    private final AtomicInteger successCalls = new AtomicInteger(0);
    private final AtomicInteger failedCalls = new AtomicInteger(0);
    private final AtomicInteger rejectedCalls = new AtomicInteger(0);

    public CircuitBreaker(String name, CircuitBreakerConfig config) {
        this.name = name;
        this.config = config;
    }

    public <T> T execute(Supplier<T> action) {
        totalCalls.incrementAndGet();

        if (!canExecute()) {
            rejectedCalls.incrementAndGet();
            throw new CircuitOpenException(name, getRemainingOpenTime());
        }

        try {
            T result = action.get();
            onSuccess();
            return result;
        } catch (Exception e) {
            onFailure();
            throw e;
        }
    }

    private boolean canExecute() {
        CircuitState current = state.get();
        if (current == CircuitState.CLOSED) return true;
        if (current == CircuitState.OPEN) {
            if (isOpenDurationElapsed()) {
                if (state.compareAndSet(CircuitState.OPEN, CircuitState.HALF_OPEN)) {
                    halfOpenAttempts.set(0);
                }
                return true;
            }
            return false;
        }
        // HALF_OPEN
        return halfOpenAttempts.incrementAndGet() <= config.halfOpenMaxAttempts();
    }

    private void onSuccess() {
        successCalls.incrementAndGet();
        CircuitState current = state.get();
        if (current == CircuitState.HALF_OPEN) {
            state.set(CircuitState.CLOSED);
            failureCount.set(0);
        } else if (current == CircuitState.CLOSED) {
            failureCount.set(0);
        }
    }

    private void onFailure() {
        failedCalls.incrementAndGet();
        lastFailureTime = Instant.now();
        int failures = failureCount.incrementAndGet();

        if (state.get() == CircuitState.HALF_OPEN) {
            state.set(CircuitState.OPEN);
        } else if (failures >= config.failureThreshold()) {
            state.set(CircuitState.OPEN);
        }
    }

    private boolean isOpenDurationElapsed() {
        return Instant.now().isAfter(
            lastFailureTime.plus(config.openDuration()));
    }

    private Duration getRemainingOpenTime() {
        Instant reopenAt = lastFailureTime.plus(config.openDuration());
        Duration remaining = Duration.between(Instant.now(), reopenAt);
        return remaining.isNegative() ? Duration.ZERO : remaining;
    }

    public CircuitState getState() { return state.get(); }

    public String getMetrics() {
        return String.format(
            "[%s] state=%s calls=%d success=%d failed=%d rejected=%d",
            name, state.get(), totalCalls.get(),
            successCalls.get(), failedCalls.get(), rejectedCalls.get()
        );
    }
}

// 例外
public class CircuitOpenException extends RuntimeException {
    private final Duration retryAfter;

    public CircuitOpenException(String name, Duration retryAfter) {
        super(String.format("サーキットブレーカー '%s' が OPEN です。%d 秒後に再試行",
            name, retryAfter.toSeconds()));
        this.retryAfter = retryAfter;
    }

    public Duration getRetryAfter() { return retryAfter; }
}

// 使用例
// var cb = new CircuitBreaker("payment-api", CircuitBreakerConfig.defaults());
// try {
//     PaymentResult result = cb.execute(() -> paymentClient.charge(amount));
// } catch (CircuitOpenException e) {
//     // フォールバック処理
//     return fallbackResult();
// }`,
      highlights: [
        { startLine: 8, endLine: 12, color: '#f59e0b', label: '3つの状態', explanation: 'CLOSED（正常）→ OPEN（遮断）→ HALF_OPEN（試行）の状態遷移。' },
        { startLine: 46, endLine: 62, color: '#22c55e', label: 'execute', explanation: '実行可否を判定し、成功/失敗に応じて状態遷移。' },
        { startLine: 64, endLine: 78, color: '#3b82f6', label: '実行可否判定', explanation: 'CAS操作で安全に OPEN → HALF_OPEN に遷移。' },
        { startLine: 91, endLine: 101, color: '#ef4444', label: '失敗処理', explanation: '閾値超えで OPEN に。HALF_OPEN 中の失敗で即 OPEN に戻る。' },
        { startLine: 125, endLine: 136, color: '#a855f7', label: 'CircuitOpenException', explanation: 'retryAfter 情報付きの例外。呼び出し側がフォールバック可能。' },
      ],
      keyPoints: [
        'CLOSED → OPEN → HALF_OPEN の3状態で障害を管理',
        'AtomicReference + CAS でスレッドセーフな状態遷移',
        '連続失敗が閾値を超えると自動的に遮断',
        'HALF_OPEN で限定的に試行し、回復を検出',
        'メトリクスで監視・アラートに活用',
      ],
    },
    {
      id: 30,
      title: 'Hexagonal Architecture',
      titleJa: 'ヘキサゴナルアーキテクチャ',
      difficulty: 'advanced',
      category: 'Architecture',
      description: 'Ports and Adapters パターン。ドメインを中心に、入出力アダプタで外部と接続します。',
      bookReference: 'Clean Architecture 第17章',
      code: `// ===== Domain Core (中心: 外部依存ゼロ) =====

// ドメインモデル
public class Subscription {
    private final SubscriptionId id;
    private final CustomerId customerId;
    private Plan plan;
    private SubscriptionStatus status;
    private java.time.LocalDate expiresAt;

    public Subscription(SubscriptionId id, CustomerId customerId,
                        Plan plan, java.time.LocalDate expiresAt) {
        this.id = id;
        this.customerId = customerId;
        this.plan = plan;
        this.status = SubscriptionStatus.ACTIVE;
        this.expiresAt = expiresAt;
    }

    public void upgrade(Plan newPlan) {
        if (status != SubscriptionStatus.ACTIVE) {
            throw new BusinessRuleViolation("アクティブでない契約はアップグレードできません");
        }
        if (newPlan.tier() <= plan.tier()) {
            throw new BusinessRuleViolation("現在と同等以下のプランにはアップグレードできません");
        }
        this.plan = newPlan;
    }

    public void cancel() {
        if (status == SubscriptionStatus.CANCELLED) {
            throw new BusinessRuleViolation("既にキャンセル済みです");
        }
        this.status = SubscriptionStatus.CANCELLED;
    }

    public void renew(java.time.LocalDate newExpiresAt) {
        if (status != SubscriptionStatus.ACTIVE) {
            throw new BusinessRuleViolation("アクティブでない契約は更新できません");
        }
        this.expiresAt = newExpiresAt;
    }

    public boolean isExpired() {
        return java.time.LocalDate.now().isAfter(expiresAt);
    }

    // getters
    public SubscriptionId getId() { return id; }
    public Plan getPlan() { return plan; }
    public SubscriptionStatus getStatus() { return status; }
}

// ===== Ports (ドメインが定義するインターフェース) =====

// Inbound Port (ユースケース): 外部からドメインへの入口
public interface SubscriptionManagement {
    SubscriptionDto subscribe(String customerId, String planId);
    SubscriptionDto upgrade(String subscriptionId, String newPlanId);
    void cancel(String subscriptionId);
    SubscriptionDto getDetails(String subscriptionId);
}

// Outbound Port: ドメインが外部に要求する操作
public interface SubscriptionStore {
    Optional<Subscription> findById(SubscriptionId id);
    Subscription save(Subscription subscription);
}

public interface PlanCatalog {
    Optional<Plan> findById(String planId);
    List<Plan> getAll();
}

public interface PaymentGateway {
    PaymentResult charge(CustomerId customerId, Money amount);
    void refund(String transactionId);
}

public interface NotificationPort {
    void notify(CustomerId customerId, String subject, String message);
}

// ===== Application Service (Inbound Port の実装) =====

public class SubscriptionService implements SubscriptionManagement {
    private final SubscriptionStore store;
    private final PlanCatalog catalog;
    private final PaymentGateway payment;
    private final NotificationPort notification;

    public SubscriptionService(SubscriptionStore store, PlanCatalog catalog,
                               PaymentGateway payment, NotificationPort notification) {
        this.store = store;
        this.catalog = catalog;
        this.payment = payment;
        this.notification = notification;
    }

    @Override
    public SubscriptionDto subscribe(String customerId, String planId) {
        Plan plan = catalog.findById(planId)
            .orElseThrow(() -> new EntityNotFoundException("プラン", planId));
        CustomerId cid = new CustomerId(customerId);

        payment.charge(cid, plan.price());

        Subscription sub = new Subscription(
            SubscriptionId.generate(), cid, plan,
            java.time.LocalDate.now().plusMonths(1)
        );
        store.save(sub);
        notification.notify(cid, "契約開始", plan.name() + " プランへようこそ");

        return toDto(sub);
    }

    @Override
    public SubscriptionDto upgrade(String subscriptionId, String newPlanId) {
        Subscription sub = store.findById(new SubscriptionId(subscriptionId))
            .orElseThrow(() -> new EntityNotFoundException("契約", subscriptionId));
        Plan newPlan = catalog.findById(newPlanId)
            .orElseThrow(() -> new EntityNotFoundException("プラン", newPlanId));

        Money diff = newPlan.price().subtract(sub.getPlan().price());
        payment.charge(sub.getId().customerId(), diff);

        sub.upgrade(newPlan);
        store.save(sub);

        return toDto(sub);
    }

    @Override
    public void cancel(String subscriptionId) {
        Subscription sub = store.findById(new SubscriptionId(subscriptionId))
            .orElseThrow(() -> new EntityNotFoundException("契約", subscriptionId));
        sub.cancel();
        store.save(sub);
        notification.notify(sub.getId().customerId(),
            "契約キャンセル", "ご利用ありがとうございました");
    }

    @Override
    public SubscriptionDto getDetails(String subscriptionId) {
        return store.findById(new SubscriptionId(subscriptionId))
            .map(this::toDto)
            .orElseThrow(() -> new EntityNotFoundException("契約", subscriptionId));
    }

    private SubscriptionDto toDto(Subscription s) {
        return new SubscriptionDto(s.getId().value(), s.getPlan().name(),
            s.getStatus().name(), s.getPlan().price().amount());
    }
}

// ===== Adapters (外部技術の実装) =====

// Inbound Adapter: REST Controller
public class SubscriptionController {
    private final SubscriptionManagement service;

    public SubscriptionController(SubscriptionManagement service) {
        this.service = service;
    }

    public ApiResponse subscribe(SubscribeRequest req) {
        var result = service.subscribe(req.customerId, req.planId);
        return ApiResponse.created(result);
    }
}

// Outbound Adapter: DB
public class PostgresSubscriptionStore implements SubscriptionStore {
    private final JdbcTemplate jdbc;

    public PostgresSubscriptionStore(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    @Override
    public Optional<Subscription> findById(SubscriptionId id) {
        // JDBCでDBからロードしてドメインオブジェクトに変換
        return Optional.empty(); // 実装省略
    }

    @Override
    public Subscription save(Subscription sub) {
        // ドメインオブジェクトをDBに保存
        return sub;
    }
}

// Outbound Adapter: Stripe決済
public class StripePaymentAdapter implements PaymentGateway {
    private final StripeClient stripe;

    public StripePaymentAdapter(StripeClient stripe) {
        this.stripe = stripe;
    }

    @Override
    public PaymentResult charge(CustomerId customerId, Money amount) {
        var charge = stripe.createCharge(customerId.value(), amount.amount());
        return new PaymentResult(charge.getId(), "SUCCESS");
    }

    @Override
    public void refund(String transactionId) {
        stripe.createRefund(transactionId);
    }
}`,
      highlights: [
        { startLine: 3, endLine: 52, color: '#f59e0b', label: 'Domain Core', explanation: 'ビジネスルールの中心。一切の外部依存なし。' },
        { startLine: 54, endLine: 82, color: '#a855f7', label: 'Ports (入出力)', explanation: 'Inbound = 外部→ドメイン、Outbound = ドメイン→外部のインターフェース。' },
        { startLine: 84, endLine: 155, color: '#22c55e', label: 'Application Service', explanation: 'Inbound Port を実装。ドメインとPort を組み合わせてユースケースを実現。' },
        { startLine: 159, endLine: 171, color: '#ec4899', label: 'Inbound Adapter', explanation: 'REST Controller。HTTPをドメイン操作に変換。' },
        { startLine: 173, endLine: 212, color: '#3b82f6', label: 'Outbound Adapter', explanation: 'DB・決済API等の外部技術をドメインのPortに適合。' },
      ],
      keyPoints: [
        'ドメインが Port（IF）を定義し、Adapter が実装',
        'Inbound Port = ユースケース、Outbound Port = 外部依存',
        'Adapter を差し替えるだけで技術スタックを変更可能',
        'テスト時は Outbound Adapter をFakeに差し替え',
        '「ドメインが中心」を構造的に強制するアーキテクチャ',
      ],
    },
    {
      id: 31,
      title: 'Saga Pattern',
      titleJa: 'Sagaパターン',
      difficulty: 'advanced',
      category: 'Architecture',
      description: '分散トランザクションを補償アクションで管理するパターン。マイクロサービスの整合性を保ちます。',
      code: `import java.util.*;

// ===== Saga ステップ定義 =====

public interface SagaStep<T> {
    String getName();
    void execute(T context);
    void compensate(T context);
}

// ===== Saga オーケストレーター =====

public class SagaOrchestrator<T> {
    private final List<SagaStep<T>> steps;
    private final List<SagaStep<T>> completedSteps = new ArrayList<>();

    public SagaOrchestrator(List<SagaStep<T>> steps) {
        this.steps = List.copyOf(steps);
    }

    public SagaResult execute(T context) {
        for (SagaStep<T> step : steps) {
            try {
                System.out.printf("[SAGA] 実行: %s%n", step.getName());
                step.execute(context);
                completedSteps.add(step);
            } catch (Exception e) {
                System.out.printf("[SAGA] 失敗: %s (%s)%n",
                    step.getName(), e.getMessage());
                compensate(context, e);
                return SagaResult.failed(step.getName(), e.getMessage());
            }
        }
        return SagaResult.success();
    }

    private void compensate(T context, Exception cause) {
        System.out.println("[SAGA] 補償処理を開始...");
        // 完了済みステップを逆順に補償
        var reversed = new ArrayList<>(completedSteps);
        Collections.reverse(reversed);
        for (SagaStep<T> step : reversed) {
            try {
                System.out.printf("[SAGA] 補償: %s%n", step.getName());
                step.compensate(context);
            } catch (Exception e) {
                System.err.printf("[SAGA] 補償失敗: %s (%s)%n",
                    step.getName(), e.getMessage());
                // 補償失敗はログに記録し、手動対応を通知
            }
        }
    }
}

public record SagaResult(boolean success, String failedStep, String error) {
    public static SagaResult success() { return new SagaResult(true, null, null); }
    public static SagaResult failed(String step, String error) {
        return new SagaResult(false, step, error);
    }
}

// ===== 注文作成 Saga の具象実装 =====

public class OrderSagaContext {
    public String orderId;
    public String customerId;
    public List<OrderItem> items;
    public long totalAmount;
    public String paymentId;
    public String shipmentId;
}

// Step 1: 在庫確保
public class ReserveInventoryStep implements SagaStep<OrderSagaContext> {
    private final InventoryService inventory;

    public ReserveInventoryStep(InventoryService inventory) {
        this.inventory = inventory;
    }

    @Override public String getName() { return "在庫確保"; }

    @Override
    public void execute(OrderSagaContext ctx) {
        for (OrderItem item : ctx.items) {
            inventory.reserve(item.productId(), item.quantity());
        }
    }

    @Override
    public void compensate(OrderSagaContext ctx) {
        for (OrderItem item : ctx.items) {
            inventory.release(item.productId(), item.quantity());
        }
    }
}

// Step 2: 決済
public class ProcessPaymentStep implements SagaStep<OrderSagaContext> {
    private final PaymentService payment;

    public ProcessPaymentStep(PaymentService payment) {
        this.payment = payment;
    }

    @Override public String getName() { return "決済処理"; }

    @Override
    public void execute(OrderSagaContext ctx) {
        ctx.paymentId = payment.charge(ctx.customerId, ctx.totalAmount);
    }

    @Override
    public void compensate(OrderSagaContext ctx) {
        if (ctx.paymentId != null) {
            payment.refund(ctx.paymentId);
        }
    }
}

// Step 3: 配送手配
public class ArrangeShipmentStep implements SagaStep<OrderSagaContext> {
    private final ShipmentService shipment;

    public ArrangeShipmentStep(ShipmentService shipment) {
        this.shipment = shipment;
    }

    @Override public String getName() { return "配送手配"; }

    @Override
    public void execute(OrderSagaContext ctx) {
        ctx.shipmentId = shipment.arrange(ctx.orderId, ctx.items);
    }

    @Override
    public void compensate(OrderSagaContext ctx) {
        if (ctx.shipmentId != null) {
            shipment.cancel(ctx.shipmentId);
        }
    }
}

// Step 4: 注文確定
public class ConfirmOrderStep implements SagaStep<OrderSagaContext> {
    private final OrderService orderService;

    public ConfirmOrderStep(OrderService orderService) {
        this.orderService = orderService;
    }

    @Override public String getName() { return "注文確定"; }

    @Override
    public void execute(OrderSagaContext ctx) {
        orderService.confirm(ctx.orderId);
    }

    @Override
    public void compensate(OrderSagaContext ctx) {
        orderService.revert(ctx.orderId);
    }
}

// ===== 組み立てと実行 =====

public class OrderSagaRunner {
    public SagaResult createOrder(OrderSagaContext context) {
        var saga = new SagaOrchestrator<>(List.of(
            new ReserveInventoryStep(inventoryService),
            new ProcessPaymentStep(paymentService),
            new ArrangeShipmentStep(shipmentService),
            new ConfirmOrderStep(orderService)
        ));
        return saga.execute(context);
    }
}`,
      highlights: [
        { startLine: 5, endLine: 9, color: '#a855f7', label: 'SagaStep IF', explanation: 'execute（正常処理）と compensate（補償処理）のペア。' },
        { startLine: 13, endLine: 53, color: '#22c55e', label: 'Orchestrator', explanation: 'ステップを順に実行。失敗時は完了済みを逆順に補償。' },
        { startLine: 73, endLine: 96, color: '#3b82f6', label: '在庫確保Step', explanation: 'execute: 在庫確保、compensate: 在庫解放。' },
        { startLine: 98, endLine: 119, color: '#3b82f6', label: '決済Step', explanation: 'execute: 課金、compensate: 返金。' },
        { startLine: 165, endLine: 177, color: '#ec4899', label: 'Saga 実行', explanation: '4ステップを連鎖。どこで失敗しても自動補償。' },
      ],
      keyPoints: [
        '各ステップに execute（正常処理）と compensate（補償処理）を定義',
        '失敗時は完了済みステップを逆順に補償',
        'Context オブジェクトでステップ間のデータを共有',
        'マイクロサービス間の結果整合性を実現',
        '補償失敗はログ記録 + 手動対応フローへ',
      ],
    },
    {
      id: 32,
      title: 'State Machine',
      titleJa: 'ステートマシン',
      difficulty: 'advanced',
      category: 'Architecture',
      description: '型安全な有限状態機械。permitsで遷移を制御し、不正な状態変更をコンパイル時に防止します。',
      code: `import java.util.*;
import java.util.function.Consumer;

// ===== State Machine Core =====

public class StateMachine<S extends Enum<S>, E extends Enum<E>> {

    private S currentState;
    private final Map<TransitionKey<S, E>, Transition<S, E>> transitions = new HashMap<>();
    private final Map<S, List<Consumer<S>>> entryActions = new HashMap<>();
    private final Map<S, List<Consumer<S>>> exitActions = new HashMap<>();
    private final List<TransitionListener<S, E>> listeners = new ArrayList<>();

    public StateMachine(S initialState) {
        this.currentState = initialState;
    }

    // Transition定義
    public record TransitionKey<S, E>(S from, E event) {}

    public record Transition<S, E>(S from, E event, S to, Guard<S, E> guard) {
        public interface Guard<S, E> {
            boolean allow(S from, E event);
        }
    }

    // ビルダスタイルで遷移定義
    public StateMachine<S, E> permit(S from, E event, S to) {
        transitions.put(new TransitionKey<>(from, event),
            new Transition<>(from, event, to, (s, e) -> true));
        return this;
    }

    public StateMachine<S, E> permitIf(S from, E event, S to,
                                        Transition.Guard<S, E> guard) {
        transitions.put(new TransitionKey<>(from, event),
            new Transition<>(from, event, to, guard));
        return this;
    }

    public StateMachine<S, E> onEntry(S state, Consumer<S> action) {
        entryActions.computeIfAbsent(state, k -> new ArrayList<>()).add(action);
        return this;
    }

    public StateMachine<S, E> onExit(S state, Consumer<S> action) {
        exitActions.computeIfAbsent(state, k -> new ArrayList<>()).add(action);
        return this;
    }

    public StateMachine<S, E> addListener(TransitionListener<S, E> listener) {
        listeners.add(listener);
        return this;
    }

    // イベント発火
    public S fire(E event) {
        var key = new TransitionKey<>(currentState, event);
        var transition = transitions.get(key);

        if (transition == null) {
            throw new IllegalStateException(String.format(
                "無効な遷移: %s + %s", currentState, event));
        }

        if (!transition.guard().allow(currentState, event)) {
            throw new IllegalStateException(String.format(
                "ガード条件不成立: %s + %s", currentState, event));
        }

        S from = currentState;
        S to = transition.to();

        // exit actions
        exitActions.getOrDefault(from, List.of()).forEach(a -> a.accept(from));

        currentState = to;

        // entry actions
        entryActions.getOrDefault(to, List.of()).forEach(a -> a.accept(to));

        // notify listeners
        listeners.forEach(l -> l.onTransition(from, event, to));

        return currentState;
    }

    public S getState() { return currentState; }

    public boolean canFire(E event) {
        var key = new TransitionKey<>(currentState, event);
        var transition = transitions.get(key);
        return transition != null && transition.guard().allow(currentState, event);
    }

    @FunctionalInterface
    public interface TransitionListener<S, E> {
        void onTransition(S from, E event, S to);
    }
}

// ===== 注文状態マシンの例 =====

public enum OrderState {
    DRAFT, PENDING_PAYMENT, PAID, SHIPPING, DELIVERED, CANCELLED
}

public enum OrderEvent {
    SUBMIT, PAY, SHIP, DELIVER, CANCEL
}

public class OrderStateMachine {
    public static StateMachine<OrderState, OrderEvent> create() {
        return new StateMachine<>(OrderState.DRAFT)
            // 正常フロー
            .permit(OrderState.DRAFT, OrderEvent.SUBMIT, OrderState.PENDING_PAYMENT)
            .permit(OrderState.PENDING_PAYMENT, OrderEvent.PAY, OrderState.PAID)
            .permit(OrderState.PAID, OrderEvent.SHIP, OrderState.SHIPPING)
            .permit(OrderState.SHIPPING, OrderEvent.DELIVER, OrderState.DELIVERED)
            // キャンセルフロー
            .permit(OrderState.DRAFT, OrderEvent.CANCEL, OrderState.CANCELLED)
            .permit(OrderState.PENDING_PAYMENT, OrderEvent.CANCEL, OrderState.CANCELLED)
            .permitIf(OrderState.PAID, OrderEvent.CANCEL, OrderState.CANCELLED,
                (state, event) -> true) // 条件付きキャンセル
            // アクション
            .onEntry(OrderState.PAID, s ->
                System.out.println("決済完了 → 在庫確保処理開始"))
            .onEntry(OrderState.CANCELLED, s ->
                System.out.println("キャンセル → 返金処理開始"))
            .onExit(OrderState.SHIPPING, s ->
                System.out.println("配送完了通知を送信"))
            // ログ
            .addListener((from, event, to) ->
                System.out.printf("[ORDER] %s --%s--> %s%n",
                    from, event, to));
    }
}

// 使用例
// var sm = OrderStateMachine.create();
// sm.fire(OrderEvent.SUBMIT);  // DRAFT → PENDING_PAYMENT
// sm.fire(OrderEvent.PAY);     // → PAID
// sm.fire(OrderEvent.SHIP);    // → SHIPPING
// sm.fire(OrderEvent.DELIVER); // → DELIVERED
// sm.canFire(OrderEvent.CANCEL); // false (DELIVERED からはキャンセル不可)`,
      highlights: [
        { startLine: 6, endLine: 12, color: '#f59e0b', label: 'StateMachine 本体', explanation: 'ジェネリクスで状態とイベントの型を型パラメータに。' },
        { startLine: 28, endLine: 39, color: '#22c55e', label: '遷移定義', explanation: 'permit/permitIf でフルーエントに遷移ルールを定義。' },
        { startLine: 57, endLine: 86, color: '#a855f7', label: 'fire (遷移実行)', explanation: '遷移可否チェック → exit → 状態更新 → entry → 通知。' },
        { startLine: 104, endLine: 137, color: '#ec4899', label: '注文SM定義', explanation: '注文の状態フローを宣言的に定義。アクションとリスナー付き。' },
      ],
      keyPoints: [
        'permit で許可された遷移のみ実行可能',
        'Guard で条件付き遷移を表現',
        'onEntry/onExit でアクションを状態に紐付け',
        'Listener でログ・通知・監査を疎結合に',
        '不正な状態遷移をランタイムで即座に検出',
      ],
    },
    {
      id: 33,
      title: 'Abstract Factory with DI',
      titleJa: '抽象ファクトリーとDI',
      difficulty: 'advanced',
      category: 'Design Patterns',
      description: '関連するオブジェクト群を一貫して生成する抽象ファクトリーに依存性注入を組み合わせます。',
      bookReference: 'GoFデザインパターン',
      code: `// ===== 抽象プロダクト群 =====

public interface DatabaseConnection {
    void connect(String url);
    void disconnect();
    QueryResult executeQuery(String sql, Object... params);
}

public interface CacheStore {
    void put(String key, Object value, Duration ttl);
    Optional<Object> get(String key);
    void invalidate(String key);
}

public interface MessageQueue {
    void publish(String topic, String message);
    void subscribe(String topic, Consumer<String> handler);
}

// ===== 抽象ファクトリー =====

public interface InfrastructureFactory {
    DatabaseConnection createDatabase();
    CacheStore createCache();
    MessageQueue createMessageQueue();
    String getEnvironmentName();
}

// ===== 本番ファクトリー =====

public class ProductionFactory implements InfrastructureFactory {
    private final Map<String, String> config;

    public ProductionFactory(Map<String, String> config) {
        this.config = config;
    }

    @Override
    public DatabaseConnection createDatabase() {
        var conn = new PostgresConnection();
        conn.connect(config.get("db.url"));
        return conn;
    }

    @Override
    public CacheStore createCache() {
        return new RedisCache(config.get("redis.url"));
    }

    @Override
    public MessageQueue createMessageQueue() {
        return new KafkaQueue(config.get("kafka.brokers"));
    }

    @Override
    public String getEnvironmentName() { return "Production"; }
}

// ===== テスト用ファクトリー =====

public class TestFactory implements InfrastructureFactory {
    @Override
    public DatabaseConnection createDatabase() {
        return new InMemoryDatabase();
    }

    @Override
    public CacheStore createCache() {
        return new InMemoryCache();
    }

    @Override
    public MessageQueue createMessageQueue() {
        return new InMemoryQueue();
    }

    @Override
    public String getEnvironmentName() { return "Test"; }
}

// ===== インメモリ実装 =====

public class InMemoryDatabase implements DatabaseConnection {
    private final List<Map<String, Object>> store = new ArrayList<>();

    @Override public void connect(String url) { /* noop */ }
    @Override public void disconnect() { /* noop */ }
    @Override
    public QueryResult executeQuery(String sql, Object... params) {
        return new QueryResult(List.of());
    }
}

public class InMemoryCache implements CacheStore {
    private final Map<String, Object> store = new ConcurrentHashMap<>();

    @Override
    public void put(String key, Object value, Duration ttl) {
        store.put(key, value);
    }

    @Override
    public Optional<Object> get(String key) {
        return Optional.ofNullable(store.get(key));
    }

    @Override
    public void invalidate(String key) {
        store.remove(key);
    }
}

public class InMemoryQueue implements MessageQueue {
    private final Map<String, List<Consumer<String>>> subscribers = new HashMap<>();

    @Override
    public void publish(String topic, String message) {
        subscribers.getOrDefault(topic, List.of())
            .forEach(handler -> handler.accept(message));
    }

    @Override
    public void subscribe(String topic, Consumer<String> handler) {
        subscribers.computeIfAbsent(topic, k -> new ArrayList<>()).add(handler);
    }
}

// ===== DI でファクトリーを注入 =====

public class Application {
    private final InfrastructureFactory factory;
    private DatabaseConnection db;
    private CacheStore cache;
    private MessageQueue mq;

    public Application(InfrastructureFactory factory) {
        this.factory = factory;
    }

    public void start() {
        System.out.printf("環境: %s で起動%n", factory.getEnvironmentName());
        db = factory.createDatabase();
        cache = factory.createCache();
        mq = factory.createMessageQueue();
    }

    public void stop() {
        db.disconnect();
    }

    public DatabaseConnection getDb() { return db; }
    public CacheStore getCache() { return cache; }
    public MessageQueue getMq() { return mq; }
}

// 使用例
// 本番: new Application(new ProductionFactory(prodConfig)).start();
// テスト: new Application(new TestFactory()).start();`,
      highlights: [
        { startLine: 3, endLine: 18, color: '#a855f7', label: '抽象プロダクト群', explanation: 'DB・Cache・MQ のインターフェース。実装技術に依存しない。' },
        { startLine: 22, endLine: 27, color: '#22c55e', label: '抽象ファクトリーIF', explanation: '関連するオブジェクト群の生成を一括定義。' },
        { startLine: 31, endLine: 57, color: '#3b82f6', label: '本番ファクトリー', explanation: 'Postgres + Redis + Kafka の本番構成。' },
        { startLine: 61, endLine: 79, color: '#f59e0b', label: 'テストファクトリー', explanation: 'すべてインメモリ。外部依存ゼロでテスト可能。' },
        { startLine: 128, endLine: 154, color: '#ec4899', label: 'DI で注入', explanation: 'Application はファクトリーIF に依存。環境ごとに差し替え。' },
      ],
      keyPoints: [
        '関連するオブジェクト群を一貫して生成',
        '本番/テスト/ステージングで丸ごと差し替え可能',
        'インメモリ実装でテスト時の外部依存を排除',
        'DI でファクトリ自体を注入し、完全な疎結合を実現',
        '環境ごとのインフラ技術の切り替えが1行で完了',
      ],
    },
  ],
};

export default course;
