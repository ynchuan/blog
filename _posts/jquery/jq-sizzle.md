#sizzle选择器

sizzle选择器作为一个单独的节点查找库，提供了效率较高的查询体验，所以非常适合以dom节点做为设计基础的jquery框架，该节点查找工具以浏览器提供的节点api作为根本，进行dom节点的查询。api为getElelementById、getElementByName、getElementByClass、querySelector(All)等低级以即高级api。

sizzle的查询优化特色之处在于模拟css选择器的查询方式，从后向前进行查询，通过锁定查找节点-筛选掉不合条件节点的方式来加快获取节点。

sizzle查询过程：

1. 将查询字符串进行分拆处理，生成分词，其中分词包含两类：带有伪类形式（即：形式）的选择器和不带伪类形式的选择器
2. 对于伪类选择器，例如$.find("div:first-child")， 该类的处理采用从左向右的方式进行节点的选择；对于非伪类选择器的，例如$.find("body #test .namet"，采用从右向左的形式进行节点的选择
3. 对于伪类的形式的选择器，会采用递归的形式进行节点的查找，其中通过一级一级节点的分词查找进行节点寻找find,其中关键方法posProcess，主要对获取的节点进行再次的查找以及对伪类条件的filter，实现多次查找，多次过滤。对于伪类条件筛选以及类别查找，使用配置查询参数实现松耦合插件式管理。
4. 非伪类的选择器，要处理其中的节点关系符号，例如"","+",">","~"等，其中会通过查询配置的字典函数并执行，来进行节点的筛选filter，实现一次查询，多次过滤。


部分代码：

    var Sizzle = function(selector, context, results, seed) {
			results = results || [];
			context = context || document;

			var origContext = context;

			if (context.nodeType !== 1 && context.nodeType !== 9) {
				return [];
			}

			if (!selector || typeof selector !== "string") {
				return results;
			}

			var m, set, checkSet, extra, ret, cur, pop, i,
				prune = true,
				contextXML = Sizzle.isXML(context),
				parts = [],
				soFar = selector;

			// Reset the position of the chunker regexp (start from head)
			// 进行查询词的拆解
			do {
				chunker.exec("");
				m = chunker.exec(soFar);

				if (m) {
					soFar = m[3];

					parts.push(m[1]);

					if (m[2]) {
						extra = m[3];
						break;
					}
				}
			} while (m);

			if (parts.length > 1 && origPOS.exec(selector)) {
				//对于存在：的选择器，采用从左向右查询分支：shift()   eg: $.find("div:first-child");  
				if (parts.length === 2 && Expr.relative[parts[0]]) {
					set = posProcess(parts[0] + parts[1], context, seed);

				} else {
					set = Expr.relative[parts[0]] ?
						[context] :
						Sizzle(parts.shift(), context);

					while (parts.length) {
						selector = parts.shift();

						if (Expr.relative[selector]) {
							selector += parts.shift();
						}

						set = posProcess(selector, set, seed);
					}
				}

			} else {
				//对于不含伪类形式的查询字段，从右向左查询分支pop() eg:$.find("body #test .namet"); 
				if (!seed && parts.length > 1 && context.nodeType === 9 && !contextXML &&
					Expr.match.ID.test(parts[0]) && !Expr.match.ID.test(parts[parts.length - 1])) {

					ret = Sizzle.find(parts.shift(), context, contextXML);
					context = ret.expr ?
						Sizzle.filter(ret.expr, ret.set)[0] :
						ret.set[0];
				}

				if (context) {
					ret = seed ? {
							expr: parts.pop(),
							set: makeArray(seed)
						} :
						Sizzle.find(parts.pop(), parts.length === 1 && (parts[0] === "~" || parts[0] === "+") && context.parentNode ? context.parentNode : context, contextXML);

					set = ret.expr ?
						Sizzle.filter(ret.expr, ret.set) :
						ret.set;

					if (parts.length > 0) {
						checkSet = makeArray(set);

					} else {
						prune = false;
					}
					//进行多词的循环过滤，其中主要处理选择关系符号，通过进行查询关系符号字典进行过滤
					while (parts.length) {
						cur = parts.pop();
						pop = cur;

						if (!Expr.relative[cur]) {
							cur = "";
						} else {
							pop = parts.pop();
						}

						if (pop == null) {
							pop = context;
						}
						//pop为从右向左的上一个关键字
						//cur为挂席符号，可以为""、"+"、"~"、">",每种符号配置有筛选函数Expr.relative
						Expr.relative[cur](checkSet, pop, contextXML);
					}

				} else {
					checkSet = parts = [];
				}
			}

			if (!checkSet) {
				checkSet = set;
			}

			if (!checkSet) {
				Sizzle.error(cur || selector);
			}

			if (toString.call(checkSet) === "[object Array]") {
				if (!prune) {
					results.push.apply(results, checkSet);

				} else if (context && context.nodeType === 1) {
					for (i = 0; checkSet[i] != null; i++) {
						if (checkSet[i] && (checkSet[i] === true || checkSet[i].nodeType === 1 && Sizzle.contains(context, checkSet[i]))) {
							results.push(set[i]);
						}
					}

				} else {
					for (i = 0; checkSet[i] != null; i++) {
						if (checkSet[i] && checkSet[i].nodeType === 1) {
							results.push(set[i]);
						}
					}
				}

			} else {
				makeArray(checkSet, results);
			}

			if (extra) {
				Sizzle(extra, origContext, results, seed);
				Sizzle.uniqueSort(results);
			}

			return results;
		};