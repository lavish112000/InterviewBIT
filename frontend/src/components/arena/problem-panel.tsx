import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { CheckCircle2, Clock, Zap } from "lucide-react"

export function ProblemPanel() {
    return (
        <div className="h-full flex flex-col bg-card">
            <div className="p-4 border-b">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-bold">Two Sum</h2>
                    <div className="flex gap-2">
                        <Badge variant="outline" className="border-green-500 text-green-500">Easy</Badge>
                        <Badge variant="secondary"><Zap className="h-3 w-3 mr-1" /> Arrays</Badge>
                    </div>
                </div>
                <div className="flex items-center text-xs text-muted-foreground gap-4">
                    <span className="flex items-center"><Clock className="h-3 w-3 mr-1" /> 20 mins</span>
                    <span className="flex items-center"><CheckCircle2 className="h-3 w-3 mr-1" /> 15/20 Test Cases</span>
                </div>
            </div>

            <div className="flex-1 overflow-auto p-4 space-y-4">
                <p className="leading-relaxed">
                    Given an array of integers <code>nums</code> and an integer <code>target</code>, return indices of the two numbers such that they add up to <code>target</code>.
                </p>
                <p className="leading-relaxed">
                    You may assume that each input would have <strong>exactly one solution</strong>, and you may not use the same element twice.
                </p>

                <Separator />

                <div className="space-y-2">
                    <h3 className="font-semibold">Example 1:</h3>
                    <div className="bg-muted p-3 rounded-md font-mono text-sm">
                        <p>Input: nums = [2,7,11,15], target = 9</p>
                        <p>Output: [0,1]</p>
                        <p>Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].</p>
                    </div>
                </div>

                <div className="space-y-2">
                    <h3 className="font-semibold">Constraints:</h3>
                    <ul className="list-disc list-inside text-sm space-y-1">
                        <li><code>2 &lt;= nums.length &lt;= 10^4</code></li>
                        <li><code>-10^9 &lt;= nums[i] &lt;= 10^9</code></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
