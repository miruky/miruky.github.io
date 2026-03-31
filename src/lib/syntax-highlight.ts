/**
 * Simple regex-based syntax highlighter for Python / TypeScript / Java.
 * Processes full code strings → per-line token arrays.
 * No external dependencies. VS Code Dark+ inspired palette.
 */

export interface SyntaxToken {
  text: string;
  color: string; // empty = inherit default
}

/* ── VS Code Dark+ Palette ── */
const C = {
  comment:   '#6a9955',
  string:    '#ce9178',
  keyword:   '#569cd6',
  control:   '#c586c0',
  constant:  '#569cd6',
  type:      '#4ec9b0',
  number:    '#b5cea8',
  decorator: '#dcdcaa',
  func:      '#dcdcaa',
};

/* ── Color map per group index (per language) ── */
// Each array maps capture-group index (1-based) → color
const PYTHON_COLORS = [
  '',          // 0: unused
  C.comment,   // 1: line comment
  C.string,    // 2: triple-quoted string
  C.string,    // 3: string
  C.decorator, // 4: decorator
  C.control,   // 5: control flow
  C.keyword,   // 6: keywords
  C.constant,  // 7: constants
  C.type,      // 8: types / builtins
  C.func,      // 9: function call
  C.number,    // 10: number
];

const TS_COLORS = [
  '',          // 0
  C.comment,   // 1: line comment
  C.comment,   // 2: block comment
  C.string,    // 3: template literal
  C.string,    // 4: string
  C.decorator, // 5: decorator
  C.control,   // 6: control flow
  C.keyword,   // 7: keywords
  C.constant,  // 8: constants
  C.type,      // 9: types
  C.func,      // 10: function call
  C.number,    // 11: number
];

const JAVA_COLORS = [
  '',          // 0
  C.comment,   // 1: line comment
  C.comment,   // 2: block comment
  C.string,    // 3: string / char
  C.decorator, // 4: annotation
  C.control,   // 5: control flow
  C.keyword,   // 6: keywords
  C.constant,  // 7: constants
  C.type,      // 8: types
  C.func,      // 9: function call
  C.number,    // 10: number
];

/* ── Regex Builders ── */

function buildPythonRegex(): RegExp {
  const g = [
    // 1 – line comment
    `(#.*$)`,
    // 2 – triple-quoted string  (lazy match across newlines)
    `((?:[brufBRUF]{0,2})"""[\\s\\S]*?"""|(?:[brufBRUF]{0,2})'''[\\s\\S]*?''')`,
    // 3 – single/double-quoted string (f/r/b prefixed)
    `((?:[brufBRUF]{0,2})"(?:[^"\\\\\\n]|\\\\.)*"|(?:[brufBRUF]{0,2})'(?:[^'\\\\\\n]|\\\\.)*')`,
    // 4 – decorator
    `(@\\w+(?:\\.\\w+)*)`,
    // 5 – control flow keywords
    `(\\b(?:if|elif|else|for|while|break|continue|return|yield|pass|raise|try|except|finally|with|assert|del|and|or|not|is|in)\\b)`,
    // 6 – definition/import keywords
    `(\\b(?:def|class|import|from|as|lambda|global|nonlocal|async|await)\\b)`,
    // 7 – constants
    `(\\b(?:None|True|False|self|cls|__name__|__main__|__all__|__init__|__str__|__repr__|__len__|__getitem__|__setitem__|__delitem__|__iter__|__next__|__enter__|__exit__|__call__|__eq__|__hash__|__bool__|__contains__|__slots__|__dict__|__class__|__doc__|__file__|__package__|__spec__|__annotations__|__wrapped__|__abstractmethods__|NotImplemented|Ellipsis|__debug__)\\b)`,
    // 8 – types & builtins
    `(\\b(?:int|str|float|bool|list|dict|tuple|set|frozenset|bytes|bytearray|complex|range|type|object|super|print|len|enumerate|zip|map|filter|sorted|reversed|min|max|sum|abs|round|all|any|isinstance|issubclass|hasattr|getattr|setattr|delattr|callable|iter|next|id|hash|repr|input|open|format|chr|ord|hex|oct|bin|pow|divmod|vars|dir|globals|locals|exec|eval|compile|memoryview|slice|staticmethod|classmethod|property|dataclass|field|fields|Enum|auto|IntEnum|Flag|IntFlag|unique|ABC|ABCMeta|abstractmethod|abstractproperty|Protocol|runtime_checkable|overload|final|Optional|List|Dict|Tuple|Set|FrozenSet|Any|Union|Callable|Type|Sequence|Iterable|Iterator|Generator|Coroutine|AsyncGenerator|AsyncIterator|AsyncIterable|Awaitable|Mapping|MutableMapping|MutableSequence|MutableSet|NamedTuple|TypeVar|TypeAlias|ClassVar|Final|Literal|Annotated|TypeGuard|TypedDict|ParamSpec|Concatenate|Never|Self|Unpack|NoReturn|Counter|defaultdict|OrderedDict|deque|ChainMap|UserDict|UserList|UserString|partial|wraps|lru_cache|cache|cached_property|reduce|total_ordering|singledispatch|singledispatchmethod|contextmanager|asynccontextmanager|suppress|closing|Exception|BaseException|ValueError|TypeError|KeyError|IndexError|AttributeError|RuntimeError|StopIteration|GeneratorExit|SystemExit|KeyboardInterrupt|IOError|OSError|FileNotFoundError|FileExistsError|PermissionError|NotImplementedError|OverflowError|ZeroDivisionError|ArithmeticError|LookupError|UnicodeError|UnicodeDecodeError|UnicodeEncodeError|BufferError|EOFError|ImportError|ModuleNotFoundError|NameError|UnboundLocalError|RecursionError|SyntaxError|IndentationError|TabError|SystemError|ReferenceError|MemoryError|ConnectionError|BrokenPipeError|ConnectionRefusedError|ConnectionResetError|TimeoutError|Warning|UserWarning|DeprecationWarning|PendingDeprecationWarning|RuntimeWarning|SyntaxWarning|ResourceWarning|FutureWarning|ImportWarning|UnicodeWarning|BytesWarning|ProcessLookupError|ChildProcessError|BlockingIOError|InterruptedError|IsADirectoryError|NotADirectoryError)\\b)`,
    // 9 – function / method call
    `(\\b[a-zA-Z_]\\w*(?=\\s*\\())`,
    // 10 – number
    `(\\b\\d+\\.?\\d*(?:e[+-]?\\d+)?j?\\b|\\b0[xX][0-9a-fA-F]+\\b|\\b0[oO][0-7]+\\b|\\b0[bB][01]+\\b)`,
  ];
  return new RegExp(g.join('|'), 'gm');
}

function buildTypeScriptRegex(): RegExp {
  const g = [
    // 1 – line comment
    `(\\/\\/.*$)`,
    // 2 – block comment
    `(\\/\\*[\\s\\S]*?\\*\\/)`,
    // 3 – template literal
    '(`(?:[^`\\\\]|\\\\.)*`)',
    // 4 – string
    `("(?:[^"\\\\\\n]|\\\\.)*"|'(?:[^'\\\\\\n]|\\\\.)*')`,
    // 5 – decorator
    `(@\\w+(?:\\.\\w+)*)`,
    // 6 – control flow
    `(\\b(?:if|else|for|while|do|break|continue|return|switch|case|throw|try|catch|finally|typeof|instanceof|in|of|yield|await|delete|void)\\b)`,
    // 7 – keywords
    `(\\b(?:const|let|var|function|class|interface|type|enum|import|export|from|as|new|this|super|extends|implements|abstract|private|public|protected|readonly|static|get|set|constructor|async|declare|namespace|module|default|keyof|infer|satisfies)\\b)`,
    // 8 – constants
    `(\\b(?:null|undefined|true|false|NaN|Infinity)\\b)`,
    // 9 – types
    `(\\b(?:string|number|boolean|any|unknown|never|void|object|symbol|bigint|Array|Promise|Record|Partial|Required|Readonly|Pick|Omit|Exclude|Extract|NonNullable|ReturnType|InstanceType|Parameters|ConstructorParameters|ThisParameterType|OmitThisParameter|ThisType|Awaited|Map|Set|WeakMap|WeakSet|Date|Error|TypeError|RangeError|SyntaxError|ReferenceError|RegExp|Symbol|BigInt|JSON|Math|Number|String|Boolean|Object|Function|Iterable|Iterator|IterableIterator|AsyncIterableIterator|Generator|AsyncGenerator|PropertyKey|TemplateStringsArray|Uppercase|Lowercase|Capitalize|Uncapitalize|NoInfer|Prettify|ReadonlyArray|ReadonlyMap|ReadonlySet|Console|Response|Request|Headers|URL|URLSearchParams|AbortController|AbortSignal|EventTarget|Event|CustomEvent|HTMLElement|Document|Window|NodeList|Element)\\b)`,
    // 10 – function call
    `(\\b[a-zA-Z_$]\\w*(?=\\s*[<(]))`,
    // 11 – number
    `(\\b\\d+\\.?\\d*(?:e[+-]?\\d+)?n?\\b|\\b0[xX][0-9a-fA-F]+n?\\b|\\b0[oO][0-7]+n?\\b|\\b0[bB][01]+n?\\b)`,
  ];
  return new RegExp(g.join('|'), 'gm');
}

function buildJavaRegex(): RegExp {
  const g = [
    // 1 – line comment
    `(\\/\\/.*$)`,
    // 2 – block comment
    `(\\/\\*[\\s\\S]*?\\*\\/)`,
    // 3 – string / char literal
    `("(?:[^"\\\\\\n]|\\\\.)*"|'(?:[^'\\\\\\n]|\\\\.)*')`,
    // 4 – annotation
    `(@\\w+(?:\\.\\w+)*)`,
    // 5 – control flow
    `(\\b(?:if|else|for|while|do|break|continue|return|switch|case|default|throw|try|catch|finally|instanceof|assert|yield)\\b)`,
    // 6 – keywords
    `(\\b(?:public|private|protected|static|final|abstract|class|interface|enum|extends|implements|new|this|super|void|import|package|throws|synchronized|volatile|transient|native|strictfp|var|record|sealed|permits|default)\\b)`,
    // 7 – constants
    `(\\b(?:null|true|false)\\b)`,
    // 8 – types
    `(\\b(?:int|long|short|byte|float|double|boolean|char|String|Integer|Long|Short|Byte|Float|Double|Boolean|Character|Void|Number|Object|Class|System|Collections|Arrays|Collectors|Objects|Math|Optional|OptionalInt|OptionalLong|OptionalDouble|Stream|IntStream|LongStream|DoubleStream|List|ArrayList|LinkedList|Map|HashMap|TreeMap|LinkedHashMap|ConcurrentHashMap|EnumMap|IdentityHashMap|WeakHashMap|Set|HashSet|TreeSet|LinkedHashSet|EnumSet|CopyOnWriteArraySet|Queue|PriorityQueue|Deque|ArrayDeque|Stack|Vector|Collection|Iterable|Iterator|ListIterator|Spliterator|Comparable|Comparator|Runnable|Callable|Future|CompletableFuture|CompletionStage|Thread|ExecutorService|Executors|ScheduledExecutorService|ThreadPoolExecutor|ForkJoinPool|ForkJoinTask|RecursiveTask|RecursiveAction|AtomicInteger|AtomicLong|AtomicBoolean|AtomicReference|ReentrantLock|ReadWriteLock|Semaphore|CountDownLatch|CyclicBarrier|Phaser|Exchanger|LockSupport|Condition|Lock|StampedLock|Predicate|Function|Consumer|Supplier|BiFunction|BiConsumer|BiPredicate|UnaryOperator|BinaryOperator|IntFunction|LongFunction|DoubleFunction|ToIntFunction|ToLongFunction|ToDoubleFunction|IntConsumer|LongConsumer|DoubleConsumer|IntSupplier|LongSupplier|DoubleSupplier|IntPredicate|LongPredicate|DoublePredicate|IntUnaryOperator|LongUnaryOperator|DoubleUnaryOperator|IntBinaryOperator|LongBinaryOperator|DoubleBinaryOperator|Exception|RuntimeException|IOException|NullPointerException|IllegalArgumentException|IllegalStateException|UnsupportedOperationException|ConcurrentModificationException|ClassCastException|ArrayIndexOutOfBoundsException|StringIndexOutOfBoundsException|NumberFormatException|ArithmeticException|StackOverflowError|OutOfMemoryError|ClassNotFoundException|NoSuchMethodException|NoSuchFieldException|SecurityException|InterruptedException|CloneNotSupportedException|Error|Throwable|Override|Deprecated|SuppressWarnings|FunctionalInterface|SafeVarargs|Retention|Target|Documented|Inherited|Repeatable|Serial|Generated|PostConstruct|PreDestroy|Resource|Inject|Named|Singleton|ApplicationScoped|RequestScoped|SessionScoped|Dependent|Alternative|Priority|Qualifier|Produces|Disposes|Observes|Transactional|RolesAllowed|PermitAll|DenyAll|Getter|Setter|Data|Builder|AllArgsConstructor|NoArgsConstructor|RequiredArgsConstructor|Value|ToString|EqualsAndHashCode|Slf4j|Log4j2|CommonsLog|Cleanup|Synchronized|With|Wither|Accessors|FieldDefaults|UtilityClass|ExtensionMethod|Delegate)\\b)`,
    // 9 – function / method call
    `(\\b[a-zA-Z_$]\\w*(?=\\s*[<(]))`,
    // 10 – number
    `(\\b\\d+\\.?\\d*(?:e[+-]?\\d+)?[fFdDlL]?\\b|\\b0[xX][0-9a-fA-F]+[lL]?\\b|\\b0[bB][01]+[lL]?\\b)`,
  ];
  return new RegExp(g.join('|'), 'gm');
}

/* ── Build & cache ── */

const REGEX_CACHE = new Map<string, RegExp>();
const COLOR_MAP: Record<string, string[]> = {
  python: PYTHON_COLORS,
  typescript: TS_COLORS,
  java: JAVA_COLORS,
};

function getRegex(lang: string): RegExp {
  if (!REGEX_CACHE.has(lang)) {
    switch (lang) {
      case 'python':     REGEX_CACHE.set(lang, buildPythonRegex()); break;
      case 'typescript': REGEX_CACHE.set(lang, buildTypeScriptRegex()); break;
      case 'java':       REGEX_CACHE.set(lang, buildJavaRegex()); break;
      default:           REGEX_CACHE.set(lang, buildTypeScriptRegex()); break;
    }
  }
  // Must clone to reset lastIndex for each call
  const src = REGEX_CACHE.get(lang)!;
  return new RegExp(src.source, src.flags);
}

function groupColor(match: RegExpExecArray, colors: string[]): string {
  for (let i = 1; i < match.length; i++) {
    if (match[i] !== undefined && colors[i]) return colors[i];
  }
  return '';
}

/* ── Public API ── */

/**
 * Tokenizes a full code string and returns per-line token arrays.
 */
export function tokenizeCode(code: string, lang: string): SyntaxToken[][] {
  const regex = getRegex(lang);
  const colors = COLOR_MAP[lang] || TS_COLORS;
  const allTokens: SyntaxToken[] = [];
  let lastIndex = 0;

  let match: RegExpExecArray | null;
  while ((match = regex.exec(code)) !== null) {
    // Default text before this match
    if (match.index > lastIndex) {
      allTokens.push({ text: code.slice(lastIndex, match.index), color: '' });
    }
    allTokens.push({ text: match[0], color: groupColor(match, colors) });
    lastIndex = regex.lastIndex;
    // Safety: prevent infinite loop on zero-length match
    if (match[0].length === 0) {
      regex.lastIndex++;
      lastIndex = regex.lastIndex;
    }
  }
  if (lastIndex < code.length) {
    allTokens.push({ text: code.slice(lastIndex), color: '' });
  }

  // Split tokens into per-line arrays
  const lines: SyntaxToken[][] = [[]];
  for (const token of allTokens) {
    const parts = token.text.split('\n');
    for (let pi = 0; pi < parts.length; pi++) {
      if (pi > 0) lines.push([]);
      if (parts[pi].length > 0) {
        lines[lines.length - 1].push({ text: parts[pi], color: token.color });
      }
    }
  }

  // Ensure every line has at least one token
  for (const line of lines) {
    if (line.length === 0) {
      line.push({ text: ' ', color: '' });
    }
  }

  return lines;
}
