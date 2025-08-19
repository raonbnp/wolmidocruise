const fs = require('fs');
const path = require('path');

// 모든 오류를 일괄 수정하는 스크립트
const fixes = [
  // 1. ROLE_PERMISSIONS 수정 (이미 완료)
  
  // 2. 사용하지 않는 import 제거
  {
    file: 'src/app/admin/page.tsx',
    changes: [
      {
        from: 'import {\n\tUsers,\n\tShip,\n\tCreditCard,\n\tTrendingUp,\n\tTrendingDown,\n\tMessageSquare,\n\tAlertTriangle,\n\tClock,\n\tCheckCircle,\n\tXCircle,\n\tEye,\n\tArrowUpRight,\n\tArrowDownRight,\n\tActivity,\n\tTarget,\n\tZap,\n\tAward\n} from "lucide-react";',
        to: 'import {\n\tUsers,\n\tShip,\n\tCreditCard,\n\tTrendingUp,\n\tMessageSquare,\n\tAlertTriangle,\n\tClock,\n\tCheckCircle,\n\tXCircle,\n\tEye,\n\tArrowUpRight,\n\tArrowDownRight,\n\tActivity,\n\tTarget,\n\tZap,\n\tAward\n} from "lucide-react";'
      },
      {
        from: 'import {\n\tAreaChart,\n\tArea,\n\tBarChart,\n\tBar,\n\tLineChart,\n\tLine,\n\tXAxis,\n\tYAxis,\n\tCartesianGrid,\n\tTooltip,\n\tLegend,\n\tResponsiveContainer\n} from "recharts";',
        to: 'import {\n\tAreaChart,\n\tArea,\n\tBarChart,\n\tBar,\n\tXAxis,\n\tYAxis,\n\tCartesianGrid,\n\tTooltip,\n\tLegend,\n\tResponsiveContainer\n} from "recharts";'
      },
      {
        from: '\tconst formatDate = (dateString: string) => {\n\t\treturn new Date(dateString).toLocaleDateString(\'ko-KR\');\n\t};',
        to: ''
      }
    ]
  }
];

console.log('모든 오류 일괄 수정 시작...');

// 수정 실행
fixes.forEach(fix => {
  try {
    let content = fs.readFileSync(fix.file, 'utf8');
    
    fix.changes.forEach(change => {
      if (content.includes(change.from)) {
        content = content.replace(change.from, change.to);
        console.log(`✅ ${fix.file}: 수정 완료`);
      }
    });
    
    fs.writeFileSync(fix.file, content);
  } catch (error) {
    console.error(`❌ ${fix.file}: 수정 실패 -`, error.message);
  }
});

console.log('일괄 수정 완료!');
