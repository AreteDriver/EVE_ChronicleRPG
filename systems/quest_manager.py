from __future__ import annotations
from dataclasses import dataclass, field
from typing import Dict, Optional, Any
import json

@dataclass
class ChronicleProgress:
    chronicle_id: str
    current_stage: str
    completed: bool = False
    flags: Dict[str, Any] = field(default_factory=dict)

class QuestManager:
    def __init__(self) -> None:
        self.chronicles: Dict[str, ChronicleProgress] = {}
    def start_chronicle(self, chronicle_id: str, start_stage: str) -> None:
        self.chronicles[chronicle_id] = ChronicleProgress(chronicle_id, start_stage)
    def get_progress(self, chronicle_id: str) -> Optional[ChronicleProgress]:
        return self.chronicles.get(chronicle_id)
    def complete_chronicle(self, chronicle_id: str) -> None:
        progress = self.chronicles.get(chronicle_id)
        if progress: progress.completed = True
    def set_flag(self, chronicle_id: str, flag: str, value: Any = True) -> None:
        progress = self.chronicles.get(chronicle_id)
        if progress: progress.flags[flag] = value
    def advance_stage(self, chronicle_id: str, new_stage: str) -> None:
        progress = self.chronicles.get(chronicle_id)
        if progress: progress.current_stage = new_stage
    # Save/load logic can be added here when needed.